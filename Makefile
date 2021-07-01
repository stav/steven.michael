.PHONY: init test clean deploy

REPO_NAME    = steven.michael
REPO_URI    := git@github.com:stav/$(REPO_NAME).git
REPO_REMOTE := $(shell git remote)
RENDER_DIR  := cowboy:/srv/net.almeroth.stevenmichael/doc

init:
	@echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@echo ~Initializing
ifeq ($(strip $(REPO_REMOTE)),)
	@echo Remote is empty
else
	-git remote rm origin
endif
	git remote add origin $(REPO_URI)
	git fetch
	git branch --set-upstream-to=origin/master master

diff:
	@if [ -d ./layouts ]; then  meld themes/academic/layouts layouts;  fi

test:
	@echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@echo ~Testing
	@echo Tests passed

clean:
	@echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@echo ~Cleaning
	rm -rf ./public

deploy:
	@echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@echo ~Deploying
	@make test
	@make clean
	hugo
	scp -r public/* $(RENDER_DIR)
	git push -u origin master
