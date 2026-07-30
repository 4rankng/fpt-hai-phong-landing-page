import { Mail01, MarkerPin01, PhoneCall01 } from '@untitledui/icons';

import type { SiteContent } from '../../data/site-content';

type SiteFooterProps = {
  content: SiteContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-brand-ink/8 bg-brand-ink text-white" id="site-footer">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-orange">Liên hệ tư vấn khu vực Hải Phòng</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">Giữ kênh liên hệ đơn giản, rõ đầu mối và dễ kiểm tra lại.</h2>
          <p className="max-w-2xl text-base leading-7 text-white/72">
            Đây là landing page tư vấn lắp mới theo khu vực. Nếu cần xác nhận địa chỉ, nhịp khảo sát hoặc tình trạng hạ tầng, bạn nên gọi trực tiếp hoặc để lại biểu mẫu để nhận cuộc gọi lại.
          </p>
        </div>
        <div className="grid gap-4">
          <a
            className="flex min-h-14 items-center gap-4 rounded-[1.5rem] border border-white/10 px-5 py-4 transition-colors hover:border-white/25"
            href={content.contact.phoneHref}
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
              <PhoneCall01 className="size-5" />
            </span>
            <span>
              <span className="block text-sm text-white/60">Hotline</span>
              <span className="block text-lg font-semibold">{content.contact.phoneDisplay}</span>
            </span>
          </a>
          <a
            className="flex min-h-14 items-center gap-4 rounded-[1.5rem] border border-white/10 px-5 py-4 transition-colors hover:border-white/25"
            href={`mailto:${content.contact.email}`}
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
              <Mail01 className="size-5" />
            </span>
            <span>
              <span className="block text-sm text-white/60">Email</span>
              <span className="block text-lg font-semibold">{content.contact.email}</span>
            </span>
          </a>
          <div className="flex min-h-14 items-center gap-4 rounded-[1.5rem] border border-white/10 px-5 py-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
              <MarkerPin01 className="size-5" />
            </span>
            <span>
              <span className="block text-sm text-white/60">Địa chỉ liên hệ</span>
              <span className="block text-lg font-semibold">{content.contact.address}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
