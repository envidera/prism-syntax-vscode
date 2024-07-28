all: build

# -------------------------------------------------------------------
# IMPORTANT:
# Building locally must be done through the `make` command.
# Remote publishing must be done through the `make publish` command
# for image URLs to be published correctly.
# -------------------------------------------------------------------
# --baseContentUrl [url]  Prepend all relative links in README.md with this url.
# --baseImagesUrl [url]   Prepend all relative image links in README.md with this url.

BASE_IMAGE_URL="https://raw.githubusercontent.com/envidera/prism-syntax-vscode/main/src"
                
# Build output dir
DIST_DIR := $(CURDIR)/dist
SRC_DIR := $(CURDIR)/src

# Latest .vsix file in dist directory
VSIX_FILE := $(shell ls $(DIST_DIR)/*.vsix | sort -V | tail -n 1)


# --pre-release
# https://code.visualstudio.com/api/working-with-extensions/publishing-extension#prerelease-extensions

build:
	@ cd $(SRC_DIR) && npm run build
	@ cd $(SRC_DIR) && vsce package --pre-release --baseImagesUrl $(BASE_IMAGE_URL)  --out $(DIST_DIR)

install:
	@ cd $(DIST_DIR) && code --install-extension $(VSIX_FILE)

# publish to marketplace
publish:
	@ cd $(SRC_DIR) && vsce publish --pre-release --baseImagesUrl ${BASE_IMAGE_URL}