import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faPalette } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

export type ProjectLinkKind = 'github' | 'follow' | 'demo' | 'theme';

export interface ProjectLink {
  kind: ProjectLinkKind;
  url: string;
}

interface ProjectLinkDefinition {
  label: string;
  icon: IconDefinition;
  getAriaLabel: (projectName: string) => string;
}

export const PROJECT_LINK_DEFINITIONS: Record<ProjectLinkKind, ProjectLinkDefinition> = {
  github: {
    label: 'GitHub',
    icon: faGithub,
    getAriaLabel: (projectName: string): string => `View ${projectName} on GitHub`,
  },
  follow: {
    label: 'Follow',
    icon: faGithub,
    getAriaLabel: (projectName: string): string => `Follow for updates on ${projectName}`,
  },
  demo: {
    label: 'Demo',
    icon: faArrowUpRightFromSquare,
    getAriaLabel: (projectName: string): string => `View ${projectName} demo`,
  },
  theme: {
    label: 'Theme',
    icon: faPalette,
    getAriaLabel: (projectName: string): string => `View ${projectName} in the Astro themes library`,
  },
};
