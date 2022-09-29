import { libWrapper } from "./lib-wrapper-shim/shim.js";

Hooks.on("ready", async () => {
    // Add custom stylesheet to TinyMCE Config
    CONFIG.TinyMCE.content_css.push("/modules/gm-secrets/css/gm-secret-style.css");

    if (game.user.isGM) {
        // Add GM Secret section type
        const customFormats = CONFIG.TinyMCE.style_formats.find(x => x.title === "Custom");
        customFormats.items.push(
            {
                title: "GM Secret",
                block: 'section',
                classes: 'secret gm-secret',
                wrapper: true
            }
        );

        // If the user is a GM, add a unique class to the body of the document so that we can selectively hide content when this class doesn't exist.
        $("body").addClass("game-master");
    } else {
        // Wrap TextEditor.enrichHTML to remove GM secret sections
        libWrapper.register("gm-secrets", "TextEditor.enrichHTML", (wrapped, content, options) => {
            const result = wrapped(content, options);
            // remove gm-secret blocks depending on async
            return options?.async ? result.then(removeGmSecret) : removeGmSecret(result);
        });
    }

    // Wrap TextEditor.create to add the appropriate class to the created editor
    const oldCreate = TextEditor.create;
    TextEditor.create = async function (options={}, content="") {
        const editor = await oldCreate.apply(this, arguments);

        // If the user is a GM, add the "game-master" class to the tinyMCE iframe body.
        if (game.user.isGM) {
            editor.dom.addClass("tinymce", "game-master");
        }

        return editor;
    }
});

function removeGmSecret(content) {
    const html = document.createElement("div");
    html.innerHTML = content;
    html.querySelectorAll("section.gm-secret").forEach(secret => secret.remove());
    return html.innerHTML;
}
