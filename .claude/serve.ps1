# Petit serveur statique local pour prévisualiser le site (outil de développement uniquement).
# - plusieurs requêtes traitées en parallèle (la vidéo ne bloque plus les images)
# - lecture par morceaux (en-têtes Range), comme un hébergeur classique
# Usage : powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1 -Port 8080
param([int]$Port = 8080)

$root = [System.IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))

$code = @'
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

public static class DevServer {
  static string root;
  static readonly Dictionary<string, string> types = new Dictionary<string, string> {
    {".html","text/html; charset=utf-8"}, {".css","text/css; charset=utf-8"},
    {".js","application/javascript; charset=utf-8"}, {".json","application/json; charset=utf-8"},
    {".svg","image/svg+xml"}, {".png","image/png"}, {".jpg","image/jpeg"}, {".jpeg","image/jpeg"},
    {".webp","image/webp"}, {".avif","image/avif"}, {".gif","image/gif"}, {".ico","image/x-icon"},
    {".mp4","video/mp4"}, {".webm","video/webm"}, {".woff2","font/woff2"}, {".woff","font/woff"},
    {".txt","text/plain; charset=utf-8"}, {".xml","application/xml; charset=utf-8"}, {".md","text/plain; charset=utf-8"}
  };

  public static void Run(string r, int port) {
    root = Path.GetFullPath(r).TrimEnd('\\') + "\\";
    HttpListener listener = new HttpListener();
    listener.Prefixes.Add("http://localhost:" + port + "/");
    listener.Start();
    Console.WriteLine("Site servi depuis " + root + " sur http://localhost:" + port + "/");
    while (listener.IsListening) {
      HttpListenerContext ctx = listener.GetContext();
      ThreadPool.QueueUserWorkItem(_ => Handle(ctx));
    }
  }

  static void Handle(HttpListenerContext ctx) {
    HttpListenerResponse res = ctx.Response;
    try {
      string rel = Uri.UnescapeDataString(ctx.Request.Url.AbsolutePath).TrimStart('/');
      if (rel == "") rel = "index.html";
      string file = Path.GetFullPath(Path.Combine(root, rel.Replace('/', '\\')));
      if (!file.StartsWith(root, StringComparison.OrdinalIgnoreCase) || !File.Exists(file)) {
        res.StatusCode = 404;
        byte[] msg = Encoding.UTF8.GetBytes("404 - fichier introuvable");
        res.OutputStream.Write(msg, 0, msg.Length);
        return;
      }
      string ext = Path.GetExtension(file).ToLowerInvariant();
      res.ContentType = types.ContainsKey(ext) ? types[ext] : "application/octet-stream";
      res.Headers["Cache-Control"] = "no-store";
      res.Headers["Accept-Ranges"] = "bytes";

      using (FileStream fs = new FileStream(file, FileMode.Open, FileAccess.Read, FileShare.ReadWrite)) {
        long len = fs.Length, start = 0, end = len - 1;
        string range = ctx.Request.Headers["Range"];
        if (!string.IsNullOrEmpty(range) && range.StartsWith("bytes=")) {
          string[] parts = range.Substring(6).Split(',')[0].Split('-');
          if (parts[0] == "" && parts.Length > 1 && parts[1] != "") {          // derniers N octets
            start = Math.Max(0, len - long.Parse(parts[1]));
          } else {
            if (parts[0] != "") start = long.Parse(parts[0]);
            if (parts.Length > 1 && parts[1] != "") end = Math.Min(long.Parse(parts[1]), len - 1);
          }
          if (start > end || start >= len) {
            res.StatusCode = 416;
            res.Headers["Content-Range"] = "bytes */" + len;
            return;
          }
          res.StatusCode = 206;
          res.Headers["Content-Range"] = "bytes " + start + "-" + end + "/" + len;
        }
        long count = end - start + 1;
        res.ContentLength64 = count;
        if (ctx.Request.HttpMethod == "HEAD") return;
        fs.Seek(start, SeekOrigin.Begin);
        byte[] buf = new byte[65536];
        long left = count;
        while (left > 0) {
          int n = fs.Read(buf, 0, (int)Math.Min(buf.Length, left));
          if (n <= 0) break;
          res.OutputStream.Write(buf, 0, n);
          left -= n;
        }
      }
    } catch {
      try { res.StatusCode = 500; } catch { }
    } finally {
      try { res.OutputStream.Close(); } catch { }
    }
  }
}
'@

Add-Type -TypeDefinition $code
[DevServer]::Run($root, $Port)
