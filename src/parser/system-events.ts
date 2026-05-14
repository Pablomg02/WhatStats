import type { SystemEvent } from '@/core/types/message';

interface EventMatcher {
  kind: SystemEvent['kind'];
  test: (content: string) => Record<string, unknown> | null;
}

const matchers: EventMatcher[] = [
  // ── Spanish (Android) ──────────────────────────────────────────────
  {
    kind: 'e2e-notice',
    test: (c) => (c.includes('cifrados de extremo a extremo') ? {} : null),
  },
  {
    kind: 'group-created',
    test: (c) => {
      const m = /^(.+?) creó el grupo "(.+)"\.?$/.exec(c);
      return m ? { actor: m[1], groupName: m[2] } : null;
    },
  },
  {
    kind: 'community-added',
    test: (c) => {
      const m = /^(.+?) te añadió a un grupo en la comunidad "(.+)"$/.exec(c);
      return m ? { actor: m[1], community: m[2] } : null;
    },
  },
  {
    kind: 'member-added',
    test: (c) => {
      const m1 = /^(.+?) añadió a (.+?)\.?$/.exec(c);
      if (m1) return { actor: m1[1], target: m1[2] };
      const m2 = /^Se añadió a (.+?)\.?$/.exec(c);
      if (m2) return { target: m2[1] };
      return null;
    },
  },
  {
    kind: 'member-joined-via-community',
    test: (c) => {
      const m = /^(.+?) se unió desde la comunidad\.?$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'member-removed',
    test: (c) => {
      const m = /^(.+?) eliminó a (.+?)\.?$/.exec(c);
      return m ? { actor: m[1], target: m[2] } : null;
    },
  },
  {
    kind: 'member-left',
    test: (c) => {
      const m = /^(.+?) salió\.?$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'group-name-changed',
    test: (c) => {
      const m = /^(.+?) cambió el asunto del grupo de "(.+)" a "(.+)"$/.exec(c);
      if (m) return { actor: m[1], from: m[2], to: m[3] };
      const m2 = /^(.+?) cambió el asunto a "(.+)"$/.exec(c);
      return m2 ? { actor: m2[1], to: m2[2] } : null;
    },
  },
  {
    kind: 'group-icon-changed',
    test: (c) => {
      const m = /^(.+?) cambió el ícono de este grupo$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'group-description-changed',
    test: (c) => {
      const m = /^(.+?) cambió la descripción del grupo$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'phone-changed',
    test: (c) => (c.includes('cambió a un nuevo número de teléfono') ? {} : null),
  },
  {
    kind: 'ephemeral-toggled',
    test: (c) => (c.includes('mensajes temporales') ? {} : null),
  },

  // ── English (iOS) ───────────────────────────────────────────────────
  {
    kind: 'e2e-notice',
    test: (c) => (c.includes('end-to-end encrypted') ? {} : null),
  },
  {
    kind: 'group-created',
    test: (c) => {
      const m = /^(.+?) created group "(.+)"\.?$/.exec(c);
      return m ? { actor: m[1], groupName: m[2] } : null;
    },
  },
  {
    kind: 'community-added',
    test: (c) => {
      const m = /^(.+?) added you to a group in the "(.+)" community\.?$/.exec(c);
      return m ? { actor: m[1], community: m[2] } : null;
    },
  },
  {
    kind: 'member-added',
    test: (c) => {
      const m1 = /^(.+?) added (.+?)\.?$/.exec(c);
      if (m1) return { actor: m1[1], target: m1[2] };
      if (/^You were added\.?$/.test(c)) return { target: 'you' };
      return null;
    },
  },
  {
    kind: 'member-joined-via-community',
    test: (c) => {
      const m = /^(.+?) joined using this group's invite link\.?$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'member-removed',
    test: (c) => {
      const m = /^(.+?) removed (.+?)\.?$/.exec(c);
      return m ? { actor: m[1], target: m[2] } : null;
    },
  },
  {
    kind: 'member-left',
    test: (c) => {
      const m = /^(.+?) left\.?$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'group-name-changed',
    test: (c) => {
      const m = /^(.+?) changed the subject from "(.+)" to "(.+)"\.?$/.exec(c);
      if (m) return { actor: m[1], from: m[2], to: m[3] };
      const m2 = /^(.+?) changed the subject to "(.+)"\.?$/.exec(c);
      return m2 ? { actor: m2[1], to: m2[2] } : null;
    },
  },
  {
    kind: 'group-icon-changed',
    test: (c) => {
      const m = /^(.+?) changed this group's icon\.?$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'group-description-changed',
    test: (c) => {
      const m = /^(.+?) (?:changed|added) (?:the )?group description\.?$/.exec(c);
      return m ? { actor: m[1] } : null;
    },
  },
  {
    kind: 'phone-changed',
    test: (c) => (c.includes('changed to a new phone number') ? {} : null),
  },
  {
    kind: 'ephemeral-toggled',
    test: (c) => (c.includes('disappearing messages') ? {} : null),
  },
];

export interface SystemEventDetection {
  event: SystemEvent;
  actor: string | null;
}

export function detectSystemEvent(rawContent: string): SystemEventDetection | null {
  const content = rawContent.trim();
  for (const matcher of matchers) {
    const payload = matcher.test(content);
    if (payload) {
      const actor = typeof payload.actor === 'string' ? payload.actor : null;
      return { event: { kind: matcher.kind, payload }, actor };
    }
  }
  return null;
}
