.PHONY: download deploy clean

download:
	node process/download-doc.js

deploy:
	rm -rf dist/*
	npm run build
	cd dist && git add . && git commit -m 'Deploy to gh-pages' && git push origin gh-pages

clean:
	rm -rf dist
	git worktree prune
	mkdir dist
	git worktree add dist gh-pages

