'use client';

import { useActionState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { Placeholder } from '@tiptap/extensions';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import ImageNode from './custom/Image';

import Tools from './Tools';

import { createPortfolio } from '@/actions/portfolio';

import './tiptap.css';
import styles from './Editor.module.css';
import { useRouter } from 'next/navigation';

const Tiptap = () => {
  const router = useRouter();

  const [state, action] = useActionState(createPortfolio, {
    content: '',
    title: '',
    server: '',
    id: '',
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Underline,
      Strike,
      ImageNode,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: '내용',
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  useEffect(() => {
    if (state.id) router.push(`/portfolio/${state.id}`);
  }, [state.id, router]);

  if (!editor) return null;

  return (
    <form action={action}>
      <div className={styles.editor}>
        <input className={styles.title} name="title" placeholder="제목" />
        <Tools editor={editor} />
        <EditorContent editor={editor} />
        <button>전송</button>
      </div>
      <input type="hidden" name="content" value={editor?.getHTML() || ''} />
      {state.server}
    </form>
  );
};

export default Tiptap;
