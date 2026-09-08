import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileDropzone } from './FileDropzone';
import { RemovableChip } from '../RemovableChip/RemovableChip';
import { StateBlock } from '../StateBlock/StateBlock';

const meta = {
  title: 'Components/FileDropzone',
  component: FileDropzone,
  args: { label: 'Attachments', onFiles: () => {} },
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithConstraints: Story = {
  args: {
    accept: '.pdf,.png,.jpg',
    multiple: true,
    description: 'PDF, PNG or JPG. Up to 10 MB each.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The limits go in `description`, where they are visible before the reader picks a file and still readable after. `accept` filters the platform picker; it is a convenience, never a guarantee — a determined drop can still hand you anything, so validate what arrives.',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    required: true,
    description: 'PDF, PNG or JPG. Up to 10 MB each.',
    error: 'Choose at least one file to upload.',
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const WithTheFilesItChose: Story = {
  render: function Render() {
    const [files, setFiles] = useState<File[]>([]);
    const oversized = files.filter((file) => file.size > 10_000_000);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <FileDropzone
          label="Attachments"
          description="PDF, PNG or JPG. Up to 10 MB each."
          multiple
          onFiles={(chosen) => setFiles((current) => [...current, ...chosen])}
        />

        {files.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {files.map((file) => (
              <RemovableChip
                key={file.name}
                label={file.name}
                removeLabel={`Remove ${file.name} from this upload`}
                onRemove={() => setFiles((current) => current.filter((f) => f !== file))}
              />
            ))}
          </div>
        )}

        {oversized.length > 0 && (
          <StateBlock
            state="error"
            scope="inline"
            title={`${oversized.length} file${oversized.length === 1 ? ' is' : 's are'} over 10 MB`}
            description="Remove them, or upload them one at a time."
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The component does not render the chosen files, and that is the boundary: only the form around it knows what "too large" means here, or whether a duplicate name is a problem. Two things this composition gets right — the file list is removable, so a mistaken pick is recoverable without starting again, and the size complaint is a `StateBlock` where the files are rather than a toast, because the reader has to take a file back out. A toast would announce the problem and then take away the place to fix it.',
      },
    },
  },
};
