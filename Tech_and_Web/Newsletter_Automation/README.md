# Newsletter To Substack Automation

This folder keeps the newsletter to Substack workflow in one clear place.

## What It Does

1. Checks `Content\newsletters` for new or changed newsletter HTML files.

2. Creates a matching markdown draft in `Content\Substack`.

3. Keeps a small state file so old newsletters are not recreated again and again.

## Main Files

1. `newsletter_to_substack.js`
The converter.

2. `Update_Substack_From_Newsletters.ps1`
Runs the converter once.

3. `Start_Substack_Auto_Watcher.ps1`
Starts the folder watcher in the background.

4. `Stop_Substack_Auto_Watcher.ps1`
Stops the folder watcher.

5. `Double_Click_To_Update_Substack_Now.bat`
Runs one update immediately.

6. `Double_Click_To_Start_Substack_Auto_Watcher.bat`
Starts the automatic watcher.

7. `Double_Click_To_Stop_Substack_Auto_Watcher.bat`
Stops the local watcher.

## Notes

The Codex app automation named `BTB Newsletter To Substack Check` checks the folder every hour.

The local watcher files are included as a backup, but the app automation is the more reliable option.

The generated Substack drafts are still worth reading once before publishing, but the file will be ready in the right folder.
