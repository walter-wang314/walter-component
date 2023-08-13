import React from 'react';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $getSelection, $insertNodes } from "lexical";
import { $generateNodesFromDOM } from '@lexical/html';

// import OnChangePlugin from '@lexical/react/LexicalOnChangePlugin'

export default function RestoreFromLocalStoragePlugin({ initialStateHtml }) {
	const [editor] = useLexicalComposerContext()
	const isFirstRender = React.useRef(true);

	React.useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;

			if (initialStateHtml) {
				// const initialEditorState = editor.parseEditorState(serializedEditorState)
				// editor.setEditorState(initialEditorState)
				editor.update(() => {
					// In the browser you can use the native DOMParser API to parse the HTML string.
					const parser = new DOMParser();
					const dom = parser.parseFromString(initialStateHtml, "text/html");

					// Once you have the DOM instance it's easy to generate LexicalNodes.
					const nodes = $generateNodesFromDOM(editor, dom);

					// Select the root
					$getRoot().select();

					// Insert them at a selection.
					$insertNodes(nodes);
				});
			}
		}
	}, [isFirstRender.current, editor]);

	// const onChange = React.useCallback(
	// 	(editorState) => {
	// 		setSerializedEditorState(JSON.stringify(editorState.toJSON()))
	// 	},
	// 	[setSerializedEditorState]
	// )

	// TODO: add ignoreSelectionChange
	// <OnChangePlugin onChange={onChange} />
	return null;
}
