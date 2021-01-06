Hooks.on("ready", async () => {
    // Add custom stylesheet to TinyMCE Config
    CONFIG.TinyMCE.content_css.push("/modules/gm-secrets/gm-secret-style.css");

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

    // Wrap TextEditor.enrichHTML to remove GM secret sections if the user is not a GM
    const oldEnrichHTML = TextEditor.enrichHTML;
    TextEditor.enrichHTML = function () {
        const content = oldEnrichHTML.apply(this, arguments);

        const html = document.createElement("div");
        html.innerHTML = content;

        if (!game.user.isGM) {
            let elements = html.querySelectorAll("section.gm-secret");
            elements.forEach(e => e.parentNode.removeChild(e));
        }

        return html.innerHTML;
    }
});
