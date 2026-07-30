import { MessageChatCircle, PhoneCall01 } from '@untitledui/icons';
import { useEffect, useState } from 'react';

import type { ContactDetails } from '../../data/site-content';
import { cx } from '../../lib/class-names';
import { ButtonAction, ButtonLink } from '../ui/button-link';
import type { LeadRequest } from './hero-section';

type FloatingActionsProps = {
  contact: ContactDetails;
  onOpenLead: (request: LeadRequest) => void;
};

export function FloatingActions({ contact, onOpenLead }: FloatingActionsProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('site-footer');

    if (!footer || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsFooterVisible(Boolean(entry?.isIntersecting));
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={isFooterVisible || undefined}
      className={cx(
        'pointer-events-none fixed inset-x-0 bottom-0 z-30 pb-safe transition-opacity',
        isFooterVisible && 'invisible opacity-0'
      )}
    >
      <div className="mx-auto flex max-w-7xl justify-end gap-3 px-4 sm:px-6 lg:px-8">
        <ButtonAction
          aria-label="Mở biểu mẫu để lại thông tin"
          className="pointer-events-auto size-14 rounded-full px-0 shadow-soft"
          onClick={() =>
            onOpenLead({
              source: 'floating',
              note: 'Tôi muốn được gọi lại để tư vấn gói và kiểm tra khu vực lắp đặt.',
              triggerLabel: 'Nút nổi để lại thông tin'
            })
          }
        >
          <PhoneCall01 className="size-6" />
        </ButtonAction>
        <ButtonLink
          aria-label="Nhắn Zalo 0931.50.55.56"
          className="pointer-events-auto size-14 rounded-full px-0 shadow-soft"
          href={contact.zaloHref}
          rel="noreferrer"
          target="_blank"
          variant="accent"
        >
          <MessageChatCircle className="size-6" />
        </ButtonLink>
      </div>
    </div>
  );
}
