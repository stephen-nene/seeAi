## how to edit the last 5 commit messages
1. Start interactive Rebase program
```sh 
  git rebase -i HEAD~5
```
2. **Edit Commit Messages:** You'll be prompted with a list of recent commits that looks like this:
```sh
  pick 1234abcd Commit message 1
  pick 5678efgh Commit message 2
  pick 90ijklmn Commit message 3
```
- Replace `pick` with `reword` for each commit whose message you want to change.
3. **Modify Commit Messages:** After choosing the commits to reword, Git will open an editor allowing you to modify each commit message one by one. Save the new messages.
4. **Finish Rebase:** After editing, Git will apply the changes and rewrite the commit history. You may need to force-push to your remote repository if it’s already been pushed:
```sh
git push --force-with-lease
```
