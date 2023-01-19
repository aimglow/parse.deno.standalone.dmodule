<#
    .synopsis
        importmapのに記述したパスの正常性確認
 #>
.{
    $APP_HOME  = (pwd).Path;
    $IMPORTMAP = Join-Path $APP_HOME "import_map.json"

    if(-not (Test-Path $IMPORTMAP)){
        Write-Warning "[ $IMPORTMAP ] not exists."
        return
    }

    $IMPORTMAP_JSON = Get-Content $IMPORTMAP -Raw | ConvertFrom-Json

    # validate "imports" path
    $result = @()
    foreach( $member in (Get-Member -InputObject $IMPORTMAP_JSON.imports -MemberType NoteProperty) ){ 
        $path = Join-Path $APP_HOME ($IMPORTMAP_JSON.imports.($member.Name)).Replace("./","/"); 
        $result += [pscustomobject]@{
            KeyName  = $member.Name;
            Location = $path;
            Exists   = "$(Test-Path $path)";
        }
    }
    
    $result | ft -property Exists,KeyName,Location
}