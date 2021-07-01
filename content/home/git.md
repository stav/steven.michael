+++
# Git.
widget = "tag_cloud"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
weight = 130  # Order that this section will appear.

title = "Git"
subtitle = "Git commands"
+++

## Forks

#### How to update a fork from the upstream branch

First add the upstream remote, let's call it `upstream`. Then display it to make
sure it took. Then fetch the code and rebase it into master. Finally push it up
to the fork remote, probably origin.

```shell
$ git remote add upstream git@github.com:scrapinghub/varanus.git
$ git remote -v
$ git checkout master
$ git fetch upstream
$ git rebase upstream/master
$ git push
```

For more detail see [Stack Overflow](https://stackoverflow.com/questions/7244321/how-do-i-update-a-github-forked-repository#answer-7244456).
