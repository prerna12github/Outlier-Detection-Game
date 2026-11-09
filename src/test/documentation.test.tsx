import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingPage } from '../components/LandingPage';
import { DocumentationModal } from '../components/DocumentationModal';
import { loadUserStats } from '../lib/storage';

describe('Documentation Button and Modal', () => {
  it('renders button with "outlier_hunt_documentation" and triggers callback when clicked', () => {
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

    // Matches button with outlier_hunt_documentation
    const docButtons = screen.getAllByRole('button', { name: /outlier_hunt_documentation/i });
    expect(docButtons.length).toBeGreaterThan(0);

    fireEvent.click(docButtons[0]);
    expect(onOpenDocumentation).toHaveBeenCalledTimes(1);
  });

  it('renders DocumentationModal with outlier_hunt_documentation preview and download actions when open', () => {
    const onClose = vi.fn();

    render(
      <DocumentationModal
        isOpen={true}
        onClose={onClose}
      />
    );

    // Checks header title and file badge
    expect(screen.getByText(/Project Documentation/i)).toBeDefined();
    expect(screen.getAllByText(/outlier_hunt_documentation/i).length).toBeGreaterThan(0);

    // Checks preview tab and formatted preview
    expect(screen.getByText(/Document Preview/i)).toBeDefined();

    // Checks download button exists for outlier_hunt_documentation
    const downloadBtns = screen.getAllByText(/Download/i);
    expect(downloadBtns.length).toBeGreaterThan(0);

    // Checks navigation tabs and sections exist
    expect(screen.getAllByText(/1\. Overview/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/3\. Math & Formulas/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/5\. Docker & Setup/i).length).toBeGreaterThan(0);
  });
});
