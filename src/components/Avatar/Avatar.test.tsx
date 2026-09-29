import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, avatarTone } from './Avatar';

describe('Avatar', () => {
  it('names itself unless decorative', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('gives a person the same colour every time, whatever the case or spacing', () => {
    expect(avatarTone('Ada Lovelace')).toBe(avatarTone('  ada lovelace '));
    const { container } = render(<Avatar name="Ada Lovelace" />);
    expect(container.firstElementChild).toHaveClass(`bh-avatar--${avatarTone('Ada Lovelace')}`);
  });

  it('spreads names across more than one colour', () => {
    const names = [
      'Ada Lovelace',
      'Grace Hopper',
      'Katherine Johnson',
      'Margaret Hamilton',
      'Hedy Lamarr',
      'Alan Turing',
    ];
    expect(new Set(names.map(avatarTone)).size).toBeGreaterThan(1);
  });

  it('draws the neutral disc on request', () => {
    const { container } = render(<Avatar name="Ada Lovelace" tone="neutral" />);
    expect(container.firstElementChild?.className).toBe('bh-avatar bh-avatar--md');
  });
});
