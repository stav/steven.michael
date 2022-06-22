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

## Ref Log

#### How to get back files from atomic actions

I'm saying "atomic actions" here to mean something that you told Git to do which
is no longer in any of your branches  we see in the normal `log`. The fact is 
that it might still available in the `reflog`.

Scenario: I made changes to two files which I committed in a single commit. I
realized I wanted them to be in two separate commits so I reverted one of the
file's changes and merged it back into the commit. This as you may have guessed
erased my changes to the second file.

To get the changes back from the second file I did:

```shell
$ git reflog
```

	0442192 (HEAD -> stdhttp) HEAD@{1}: rebase (continue) (pick): TEMP: count index 0
	c41e23b HEAD@{2}: rebase (continue) (fixup): f: server: gold signal
	584d118 HEAD@{3}: rebase: fast-forward
	ce8f2bf HEAD@{4}: rebase -i (start): checkout
	eaf27f2 HEAD@{5}: rebase (continue) (finish): returning to refs/heads/stdhttp
	eaf27f2 HEAD@{6}: rebase (continue) (pick): TEMP: count index 0
	042ec6b HEAD@{7}: rebase (continue) (pick): f: tx revert
	584d118 HEAD@{8}: rebase -i (start): checkout
	d6664ce HEAD@{9}: commit: f: tx revert
	669952e HEAD@{10}: commit: TEMP: count index 0
	584d118 HEAD@{11}: commit: f: server: gold signal
	ce8f2bf HEAD@{12}: commit: f: server: good job

I could see the line where I committed the reversion (I'm glad I take the extra 
half-second to give meaningful names to my fixups):

	d6664ce HEAD@{9}: commit: f: tx revert

So then I did:

```shell
$ git co 669952e -- ./src/bot/telegram/telethonx.py
```

I got this from Joshua Wehner's blog post: 
[How to undo (almost) anything with Git](https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/)
in the section _Redo after undo “local”_.
