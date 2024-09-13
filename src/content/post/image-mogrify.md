---
title: "Using a Little ImageMagick to Resize a Bunch of Pictures"
description: "I often take images off my phone which are a few megabytes and I want to use them on the web so I need to resize them all at once."
pubDate: "2024-09-13"
tags: ["Images"]
---

This command will output new copies of the *mogrified* files:

    mogrify -path ./sized -resize 1000x1000\> -quality 70 -format jpg *.jpg

Here is the command breakdown:

| **Command/Parameter**       | **Explanation**                                                                 |
|-----------------------------|---------------------------------------------------------------------------------|
| `mogrify`                   | Modifies images in bulk, applying transformations to multiple files at once.    |
| `-path ./sized`             | Specifies the folder where resized images will be saved.                        |
| `-resize 1000x1000\>`       | Resizes images so that the longest side is 1000 pixels while maintaining aspect ratio. |
| `-quality 70`               | Sets the image quality/compression level to 70.                                 |
| `-format jpg`               | Ensures the output format is JPEG.                                              |
| `*.jpg`                     | Processes all JPEG files in the current directory.                              |

## ChatGPT

Here is the chat session with [ChatGPT 4o](https://chatgpt.com/c/66e48b8b-cc00-8007-87b2-919055217fe6).

### Prompt

> I have a dozen JPEG pictures on my computer that are a couple megabytes each.  What Image Magick command would I use to resize them having the longest side being 1000 pixels. I want the compression to be 70 and saved as copies into a separate folder.

You can use ImageMagick to resize the images and compress them with the following command:

```bash
mogrify -path /path/to/output/folder -resize 1000x1000\> -quality 70 -format jpg /path/to/input/folder/*.jpg
```

Here’s what each part of the command does:
- `mogrify` modifies images in bulk.
- `-path /path/to/output/folder` specifies the folder where resized images will be saved.
- `-resize 1000x1000\>` resizes the images so that the longest side is 1000 pixels, maintaining the aspect ratio.
- `-quality 70` sets the image quality to 70 (for compression).
- `-format jpg` ensures the output is in JPEG format.
- `/path/to/input/folder/*.jpg` processes all JPEG files in the input folder.

Make sure to replace `/path/to/output/folder` and `/path/to/input/folder` with the actual directories on your computer.

### Question

> How does this command compare to the `convert` command?

The `mogrify` and `convert` commands in ImageMagick serve similar purposes, but they have key differences:

- **`convert`**: This command is typically used when you want to create a new image from an input. It reads an image, applies transformations (like resizing), and outputs the result to a new file. It does not modify the original files unless you specifically overwrite them by naming the output the same as the input.
- **`mogrify`**: This command modifies images in place, meaning it changes the original files by default. However, when used with the `-path` option, it can save the modified images to a different directory, like in your case.

### Key differences

#### Output location:
  - `convert`: You specify the input and output files manually.
  - `mogrify`: By default, it overwrites files, but you can use `-path` to save them elsewhere.

#### Efficiency:

  - `mogrify` is more efficient when processing many files at once since it handles multiple images in a batch without needing to specify output file names individually.

#### Use case:

  - Use `convert` when you want to process one image and specify the output filename.
  - Use `mogrify` when you want to process multiple files, especially in bulk, saving them into a new directory without naming each output file individually.

If you want to achieve the same result with `convert`, you’d need to process each file individually, like this:

```bash
convert /path/to/input/file.jpg -resize 1000x1000\> -quality 70 /path/to/output/file.jpg
```

For batch processing, you'd have to write a script that loops through all files. `mogrify` simplifies this process by handling it internally.
