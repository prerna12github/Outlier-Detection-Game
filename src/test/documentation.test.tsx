import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingPage } from '../components/LandingPage';
import { DocumentationModal } from '../components/DocumentationModal';
import { loadUserStats } from '../lib/storage';

describe('Documentation Button and Modal', () => {
  it('renders "View Documentation" button on the home page and triggers callback when clicked', () => {
    const onStartPlay = vi.fn();
    const onOpenHowToPlay = vi.fn();
    const onOpenDocumentation = vi.fn();

    render(
      <LandingPage
        onStartPlay={onStartPlay}
        onOpenHowToPlay={onOpenHowToPlay}
        onOpenDocumentation={onOpenDocumentation}
        userStats={loadUserStats()}
      />
    );

    const docButton = screen.getByRole('button', { name: /view documentation/i });
    expect(docButton).toBeDefined();

    fireEvent.click(docButton);
    expect(onOpenDocumentation).toHaveBeenCalledTimes(1);
  });

  it('renders DocumentationModal with download actions and sections when open', () => {
    const onClose = vi.fn();

    render(
      <DocumentationModal
        isOpen={true}
        onClose={onClose}
      />
    );

    // Checks header title
    expect(screen.getByText(/Project Documentation/i)).toBeDefined();

    // Checks download button exists
    const downloadBtns = screen.getAllByText(/Download/i);
    expect(downloadBtns.length).toBeGreaterThan(0);

    // Checks navigation tabs exist
    expect(screen.getByText(/1\. Overview/i)).toBeDefined();
    expect(screen.getByText(/3\. Math & Formulas/i)).toBeDefined();
    expect(screen.getByText(/5\. Docker & Setup/i)).toBeDefined();
  });
});
