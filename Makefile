.PHONY: deploy

deploy:
	rm -rf dist/*
	parcel build public/index.html --public-url ./
	# git worktree add dist gh-pages
	cd dist && git add . && git commit -m 'Deploy to gh-pages' && git push origin gh-pages
