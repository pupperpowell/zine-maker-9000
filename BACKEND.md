# Zine Maker 9000 backend

The atomic elements of a zine are text, SVGs, and images. They are stored in Pocketbase.

The structure of the database, from simplest to most abstract:

- Elements (text, svg, image),'type', 'x & y', 'width & height', and some kind of 'content'.

- Pages (page metadata and 'content' JSON array, containing 'elements')
- Zines (zine metadata and (unordered?) array of pages)

The three atomic elements — text, SVGs, and images — all have the following properties:
- type (to identify the type of element)
- x & y (position)
- width & height (dimensions)
- content

## Text content
- The text content is the Slate.js JSON document tree stored directly in the content field.

## SVG content
- The SVG content is a string of SVG code stored directly in the content field.?

## Image content
- The image content is a string of the image URL stored directly in the content field.
- The image is stored in the Pocketbase 'assets' collection.

# Examples

