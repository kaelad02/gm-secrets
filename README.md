# GM Secret Block

Adds a type of formatting block to text editors that only GMs can see and edit.
Players cannot see or edit text in a GM Secret block, even if they own the entity containing the description.

![GM view vs player view of a cursed item where the curse is hidden by a GM secret](https://f002.backblazeb2.com/file/cws-images/FVTT-GM-Secrets/gm-secrets-cursed-item.webp)

![A comparison of the appearance of a core "Secret" block and a "GM Secret" block](https://f002.backblazeb2.com/file/cws-images/FVTT-GM-Secrets/gm-secrets-comparison.webp)

## Features and Usage

This module adds a new block style for all TinyMCE text editors in Foundry.
This applies to Journal Entries and Actor and Item descriptions.

Using the GM Secret block style is similar to using the core-provided Secret block style:
1. Select the text you want to be hidden.
2. Click on the style selector (it is a drop-down selector at the top-left of the editor box; by default it says "Paragraph").
3. Select "Custom" > "GM Secret".

This module also adds some visual styling to make the difference between normal Secret blocks and GM Secret blocks more noticeable.
GM Secret blocks have a red background, and both types of block now have a textual indicator of what type they are (see the screenshot above which shows the differences).

## Caveats

There are currently a few issues that allow players to be able to access hidden gm secret text for entities that they own:

1. A player can `CTRL+A` to select all text, then remove formatting.
   - *This might be fixable if we can prevent the user from selecting hidden elements.*
2. A player can inadvertently delete text in a GM Secret block using backspacing.
   This method can also be used to inadvertently add new content to a GM Secret block.
   To the user it appears as though their text completely disappears.
3. A player can view the source of the editor contents.
   - *Won't fix.*

## License

Licensed under the GPLv3 License (see [LICENSE](LICENSE)).
