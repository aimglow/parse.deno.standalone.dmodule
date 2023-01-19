##
# TEST impostmap

$APP_HOME = (pwd).Path
$DEV      = $true
$TEST     = $false

function debug-print($message){
    Write-Host "DEBG: " -ForegroundColor Cyan -BackgroundColor Black -NoNewline; 
    switch($message.GetType().Name){
       'Match'           { $message | fl }
       'Hashtable'       { $message | fl }
       'PSCustomObject'  { $message | ft }
       'Object[]'        {
            switch($message[0].GetType().Name){
               'PSCustomObject'  { $message }
                Default          { Write-Host $message }
            }
       }
       Default  { Write-Host $message }
    }
}

function warn-print($message){
    Write-Host "WARN: " -ForegroundColor Yellow -BackgroundColor Black -NoNewline; 
    switch($message.GetType().Name){
       'Hashtable'       { $message | fl }
       'PSCustomObject'  { $message | ft }
       'Object[]'        {
            switch($message[0].GetType().Name){
               'PSCustomObject'  { $message | ft }
               Default           { Write-Host $message }
            }
       }
       Default  { Write-Host $message }
    }
}

function test-imports{
    [CmdletBinding()]
    Param()
    if(-not (Test-Path "deno.json")){
        Write-Host "ERROR: " -NoNewline -ForegroundColor Red -BackgroundColor Black
        Write-Host "directory is not root."
        Write-Host "USAGE: " -NoNewline -ForegroundColor Cyan -BackgroundColor Black
        Write-Host "goto projectroot, then invoke command 'test-imports'. then root must have 'deno.json'."
        return;
    }
    
    $filelist = Get-ChildItem -Recurse | ?{ $_.Extension -match '(ts|tsx|js|jsx)' } | %{ $_.FullName }

    if($TEST){ $filelist = ".\test\testdata\import.check.testfile.ts" }
    #if($DEV){ debug-print $($msg="`$filelist : `n"; $filelist | %{ $msg += "$_`n" }; $msg)  }

    $resultfile = "imports.parse.json"
    if($DEV){ $resultfile = ".\test\result\imports.json" }

    $imports = get-imports $filelist
    ConvertTo-Json -Depth 2 -InputObject $imports | Out-File $resultfile

    { # 不要な要素が入っているので削除する。  <開発中>
        $content = Get-Content $resultfile -Raw 

        $pattern = '\n[ ]{4}(<?obj>\{.*\n[ ]{4}\}),'
        $opt     = [System.Text.RegularExpressions.RegexOptions]::ECMAScript + [System.Text.RegularExpressions.RegexOptions]::IgnoreCase + [System.Text.RegularExpressions.RegexOptions]::Multiline
        $regex   = [regex]::new($pattern,$opt)

        foreach($m in $regex.Matches($content)){
            if($DEV){ debug-print $($msg="`$filelist : `n"; $filelist | %{ $msg += "$_`n" }; $msg)  }
        }
    }
    
    replaceFrom-importmap($imports) -Debug

    return $imports
}

function get-imports{
    [CmdletBinding()]
    Param($filelist)

    $unparses = @()
    $result = @()
    foreach($item in $filelist){
        $content = Get-Content $item -Raw -ErrorAction SilentlyContinue # try-catchではcatchされない。
        if("$content" -eq ""){
            $unparses += $item
            continue
        }

        $pattern = '^import\s+(?<object>[\w\W]*?)\s+from\s+(?<location>[\w\W]*?);'
        $opt     = [System.Text.RegularExpressions.RegexOptions]::ECMAScript + [System.Text.RegularExpressions.RegexOptions]::IgnoreCase + [System.Text.RegularExpressions.RegexOptions]::Multiline
        $regex   = [System.Text.RegularExpressions.Regex]::new($pattern,$opt)
        
        foreach($m in $regex.Matches($content)){
            Write-Debug $m

            $importObjects = $m.Groups["object"].Value.Replace('{','').Replace('}','').Replace("`n",'').Trim().Split(',')
            for($i = 0; $i -lt $importObjects.Length; $i++){
                $importObjects[$i] = $importObjects[$i].Trim()
            }
            $locationString = $m.Groups["location"].Value.Replace('"','').Replace("'",'');

            $result += [pscustomobject]@{
                object      = $importObjects
                location    = $locationString
                wholeMatch  = $m.Value;
            }
            # if($DEV){ debug-print $result[$result.length - 1] }
        }
        # if($DEV){ debug-print $result }
    }
    if($DEV){ debug-print $result }

    if($unparses.length -gt 0){
        warn-print "[cannot parse items]"
        $unparses | %{ warn-print $_ }
    }

    return $result
}

function replaceFrom-importmap{
    [CmdletBinding()]
    param($imports)
    $importmap = Get-Content "import_map.json" -Raw | ConvertFrom-Json

    foreach($item in  $importmap){
        
        $importmap.imports

        Write-Debug $item

    }
}

$null = test-imports
