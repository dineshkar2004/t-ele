$FilePath = "C:\Users\Swathee\Desktop\t-ele\server\uploads\license.jpeg"

$Body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "securepassword"
    gstNumber = "27AAECS1879J1Z1"
    panNumber = "AAECS1879J"
    aadharNumber = "123456789012"
}

# Convert to JSON format
$JsonBody = $Body | ConvertTo-Json -Depth 2

# Send the request with the image as a file
$Response = Invoke-RestMethod -Uri "http://localhost:5000/shopkeeper/register" `
    -Method Post `
    -Headers @{"Content-Type" = "multipart/form-data"} `
    -Body $JsonBody `
    -InFile $FilePath

Write-Output $Response

