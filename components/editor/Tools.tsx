import { Editor } from '@tiptap/react';

import styles from './Tools.module.css';
import Button from './compositions/Button';
import Dropdown from './compositions/Dropdown';
import { ReactNode } from 'react';

const Section = ({ children }: { children: ReactNode }) => {
  return <div className={styles.section}>{children}</div>;
};

const Tools = ({ editor }: { editor: Editor }) => {
  return (
    <div className={styles.tools}>
      <Section>
        <Dropdown
          selected={
            editor.isActive('heading', { level: 1 }) ||
            editor.isActive('heading', { level: 2 }) ||
            editor.isActive('heading', { level: 3 }) ||
            editor.isActive('heading', { level: 4 })
          }
          title="HEADING"
        >
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            제목 1
          </Dropdown.DropdownItem>
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            제목 2
          </Dropdown.DropdownItem>
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            제목 3
          </Dropdown.DropdownItem>
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            제목 4
          </Dropdown.DropdownItem>
        </Dropdown>
      </Section>
      <Section>
        <Button
          selected={editor.isActive('bold')}
          handleClick={() => editor.chain().focus().toggleBold().run()}
        >
          BOLD
        </Button>
        <Button
          selected={editor.isActive('underline')}
          handleClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          UNDERLINE
        </Button>
        <Button
          selected={editor.isActive('strike')}
          handleClick={() => editor.chain().focus().toggleStrike().run()}
        >
          STRIKE
        </Button>
      </Section>
      <Section>
        <Dropdown
          selected={
            editor.isActive('heading', { level: 1 }) ||
            editor.isActive('heading', { level: 2 }) ||
            editor.isActive('heading', { level: 3 }) ||
            editor.isActive('heading', { level: 4 })
          }
          title="ARRAY"
        >
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleTextAlign('left').run()
            }
          >
            왼쪽정렬
          </Dropdown.DropdownItem>
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleTextAlign('center').run()
            }
          >
            가운데정렬
          </Dropdown.DropdownItem>
          <Dropdown.DropdownItem
            handleClick={() =>
              editor.chain().focus().toggleTextAlign('right').run()
            }
          >
            오른쪽정렬
          </Dropdown.DropdownItem>
        </Dropdown>
      </Section>
      <Section>
        <Button
          handleClick={() =>
            editor.commands.insertContent({ type: 'customImageNode' })
          }
        >
          IMAGE
        </Button>
      </Section>
    </div>
  );
};

export default Tools;
