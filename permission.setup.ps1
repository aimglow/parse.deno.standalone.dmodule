
# 所有者と権限の確認
Get-ChildItem -Recurse | Get-ACL

# 所有者
# takeown /s PC名 /u ユーザ名 /f フォルダ名 
$pc = $Env:Computername
$user = $env:username

takeown /s $pc /u $user /f $item


# 権限付与  /t=recursive
# icacls ファイルorフォルダ名 /grant ユーザー名:権限名
$user = $env:username
$perm = 'F'
$grant = "${user}:${perm}"

icacls $item /grant $grant #/t


## 権限名
#  N – アクセス権なし
#  F – フルアクセス権
#  M – 変更アクセス権
#  RX – 読み取りと実行のアクセス権
#  R – 読み取り専用アクセス権
#  W – 書き込み専用アクセス権
#  D – 削除アクセス権
#


{#example
$tgtDir = (pwd).Path
$tgtAcl = Get-ChildItem $tgtDir | Get-Acl #ターゲットフォルダ内のNTFS情報を取得する。
foreach($a in $tgtAcl){ #NTFS情報を走査する。
     foreach($ar in $a.Access){ # アクセス権の一覧を走査する。 
        if($ar.IsInherited -eq $false){ #継承が無効化されているユーザーがいる≒処理済みのフォルダ
            break # アクセス権変更を行わない
        }
        # 継承が無効化されたアクセス権（表示順序最上）が存在しないので処理を行う
        if($a.Owner -eq $ar.IdentityReference.Value){ # フォルダの所有者と同じユーザーが存在したらのアクセス権を追加する。
            $u = $ar.IdentityReference.Value # ユーザー名文字列を取得
            $p = Convert-Path($a.Path) # 対象のフォルダを文字列で保存
            $a.Owner # オーナーをコンソールに表示
            #icacls で権限を追加
            icacls ${p} /grant:r ${u}:`(OI`)`(CI`)F /t /c /l /q
        }
    }

}
}


{#example
$folder = "\\fileServer\本社\人事総務部\給与担当\給報"
$users = @("mydomain.net\spot_user1", "mydomain.net\spot_user2", "mydomain.net\spot_user3")

# サブフォルダ含めて、所有者をadministratorsグループに変更
cmd /c "TAKEOWN /F $folder /R /A"

# サブフォルダ含めて、フルアクセス権を付与
$users | %{ cmd /c "ICACLS $folder /GRANT ${_}:F /T" }
}