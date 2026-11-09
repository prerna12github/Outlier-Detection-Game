import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingPage } from '../components/LandingPage';
import { DocumentationModal } from '../components/DocumentationModal';
import { loadUserStats } from '../lib/storage';

describe('Documentation Button and Modal', () => {
  it('renders a button labeled "View Documentation" on the landing page and triggers callback when clicked', () => {
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

    // Matches button labeled "View Documentation"
    const docButtons = screen.getAllByRole('button', { name: /view documentation/i });
    expect(docButtons.length).toBeGreaterThan(0);

    fireEvent.click(docButtons[0]);
    expect(onOpenDocumentation).toHaveBeenCalledTimes(1);
  });

  it('renders DocumentationModal with embedded PDF preview, "Download PDF" button, and back/close buttons', () => {
    const onClose = vi.fn();

    render(
      <DocumentationModal
        isOpen={true}
        onClose={onClose}
      />
    );

    // Checks title and PDF file badge
    expect(screen.getByText(/Outlier Hunt Documentation/i)).toBeDefined();
    expect(screen.getAllByText(/Outlier_Hunt_Documentation\.pdf/i).length).toBeGreaterThan(0);

    // Checks "Download PDF" button exists
    const downloadPdfButtons = screen.getAllByRole('link', { name: /download pdf/i });
    expect(downloadPdfButtons.length).toBeGreaterThan(0);
    expect(downloadPdfButtons[0].getAttribute('href')).toBe('/Outlier_Hunt_Documentation.pdf');

    // Checks Back / Close buttons exist and trigger onClose
    const backBtn = screen.getByRole('button', { name: /back/i });
    expect(backBtn).toBeDefined();
    fireEvent.click(backBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
