.PHONY: deploy clean

deploy:
	rm -rf dist/*
	parcel build public/index.html --public-url ./
	cd dist && git add . && git commit -m 'Deploy to gh-pages' && git push origin gh-pages

clean:
	rm -rf dist
	git worktree prune
	mkdir dist
	git worktree add dist gh-pages

