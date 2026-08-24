$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:3000/")
$listener.Start()
Write-Host "Server started at http://localhost:3000"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    
    $requestPath = $context.Request.Url.LocalPath
    $localPath = "E:\SJ IMAGE" + $requestPath.Replace("/", "\")
    
    if ($localPath.EndsWith("\")) { $localPath += "index.html" }
    
    if (Test-Path $localPath -PathType Leaf) {
        try {
            $content = [System.IO.File]::ReadAllBytes($localPath)
            
            # Basic mime types
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".webp" { $response.ContentType = "image/webp" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.StatusCode = 200
        } catch {
            $response.StatusCode = 500
        }
    } else {
        $response.StatusCode = 404
    }
    $response.Close()
}
