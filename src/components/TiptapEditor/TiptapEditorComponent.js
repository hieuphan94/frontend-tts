'use client';

import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
  FiBold,
  FiItalic,
  FiList
} from 'react-icons/fi';

const MenuBar = memo(({ editor }) => {
  if (!editor) return null;

  const handleBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor]);
  const handleItalic = useCallback(() => editor.chain().focus().toggleItalic().run(), [editor]);
  const handleAlignLeft = useCallback(
    () => editor.chain().focus().setTextAlign('left').run(),
    [editor]
  );
  const handleAlignCenter = useCallback(
    () => editor.chain().focus().setTextAlign('center').run(),
    [editor]
  );
  const handleAlignRight = useCallback(
    () => editor.chain().focus().setTextAlign('right').run(),
    [editor]
  );
  const handleAlignJustify = useCallback(
    () => editor.chain().focus().setTextAlign('justify').run(),
    [editor]
  );
  const handleBulletList = useCallback(
    () => editor.chain().focus().toggleBulletList().run(),
    [editor]
  );

  return (
    <div className="border-b border-gray-200 p-2 flex gap-2">
      <button
        onClick={handleBold}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        title="Bold"
      >
        <FiBold size={16} />
      </button>
      <button
        onClick={handleItalic}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        title="Italic"
      >
        <FiItalic size={16} />
      </button>
      <button
        onClick={handleAlignLeft}
        disabled={!editor.can().chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('left') ? 'bg-gray-200' : ''}`}
        title="Left"
      >
        <FiAlignLeft size={16} />

      </button>
      <button
        onClick={handleAlignCenter}
        disabled={!editor.can().chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('center') ? 'bg-gray-200' : ''}`}
        title="Center"
      >
        <FiAlignCenter size={16} />
      </button>
      <button
        onClick={handleAlignRight}
        disabled={!editor.can().chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('right') ? 'bg-gray-200' : ''}`}
        title="Right"
      >
        <FiAlignRight size={16} />
      </button>
      <button
        onClick={handleAlignJustify}
        disabled={!editor.can().chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('justify') ? 'bg-gray-200' : ''}`}
        title="Justify"
      >
        <FiAlignJustify size={16} />
      </button>
      <button
        onClick={handleBulletList}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 text-gray-600 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        title="Bullet List"
      >
        <FiList size={16} />
      </button>
    </div>
  );
});

MenuBar.propTypes = {
  editor: PropTypes.object,
};

MenuBar.displayName = 'MenuBar';

const TiptapEditorComponent = memo(({ content = '', onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        paragraph: {
          HTMLAttributes: {
            class: 'mb-4',
          },
        },
      }),
      TextAlign.configure({
        types: ['paragraph', 'heading'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 min-h-[200px] focus:outline-none [&_*]:outline-none',
        spellcheck: 'false',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });

  if (typeof window === 'undefined') return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="
    prose max-w-none p-4 min-h-[200px] focus:outline-none
    text-gray-600
    [&_*]:outline-none
    [&_*]:spellcheck-none
    [&>ul]:list-disc [&>ul]:ml-6
    [&>ol]:list-decimal [&>ol]:ml-6
    [&>li]:mb-1
  "
      />
    </div>
  );
});

TiptapEditorComponent.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
};

TiptapEditorComponent.displayName = 'TiptapEditorComponent';

export default TiptapEditorComponent;
