import { ClockRewind, MarkerPin01, PhoneCall01 } from '@untitledui/icons';

import type { ContactDetails, SiteContent } from '../../data/site-content';
import type { LeadTriggerSource } from '../../lib/lead-submit';
import { ButtonLink } from '../ui/button-link';

export type LeadRequest = {
  source: LeadTriggerSource;
  area?: string;
  planName?: string;
  note?: string;
  triggerLabel: string;
};

type HeroSectionProps = {
  content: SiteContent;
  contact: ContactDetails;
};

export function HeroSection({ content, contact }: HeroSectionProps) {
  return (
    <section className="border-b border-brand-ink/8 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-18">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-orange">{content.badge}</p>
            <h1 className="max-w-3xl text-pretty text-4xl font-semibold tracking-[-0.045em] text-brand-ink sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-brand-muted">{content.intro}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-3xl border border-brand-ink/10 bg-brand-shell px-4 py-4">
              <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-brand-blue text-white">
                <PhoneCall01 className="size-5" />
              </div>
              <p className="text-sm font-semibold text-brand-ink">Gọi ngay khi cần chốt lịch</p>
              <p className="mt-2 text-sm leading-6 text-brand-muted">Hotline trực tiếp, phù hợp khi bạn đã có sẵn địa chỉ và cần hỏi nhanh.</p>
            </article>
            <article className="rounded-3xl border border-brand-ink/10 bg-brand-shell px-4 py-4">
              <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-brand-orange text-white">
                <ClockRewind className="size-5" />
              </div>
              <p className="text-sm font-semibold text-brand-ink">Nhịp xử lý thường 24-48 giờ</p>
              <p className="mt-2 text-sm leading-6 text-brand-muted">Thời gian thực tế vẫn phụ thuộc tuyến cáp và bước xác nhận hạ tầng ở từng khu vực.</p>
            </article>
            <article className="rounded-3xl border border-brand-ink/10 bg-brand-shell px-4 py-4">
              <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-brand-green text-white">
                <MarkerPin01 className="size-5" />
              </div>
              <p className="text-sm font-semibold text-brand-ink">Điền khu vực trước khi báo giá</p>
              <p className="mt-2 text-sm leading-6 text-brand-muted">Biểu mẫu luôn ưu tiên lấy đúng khu vực để tư vấn sát hơn với địa chỉ lắp đặt.</p>
            </article>
          </div>

          <ul className="grid gap-3 text-sm leading-6 text-brand-muted">
            {content.heroBullets.map((item) => (
              <li className="flex gap-3 rounded-2xl border border-brand-ink/10 px-4 py-3" key={item}>
                <span aria-hidden="true" className="mt-2 size-2 rounded-full bg-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex">
            <ButtonLink href={contact.phoneHref}>
              <PhoneCall01 className="size-5" />
              <span>Gọi {contact.phoneDisplay}</span>
            </ButtonLink>
          </div>

          <p className="text-sm leading-6 text-brand-muted">{content.disclaimer}</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-brand-ink/10 bg-brand-shell">
            <img
              alt="Kỹ thuật viên mạng cáp quang đang thao tác dây cáp trắng và thiết bị phát trong nhà."
              className="aspect-[6/5] w-full object-cover object-center"
              fetchPriority="high"
              height={900}
              loading="eager"
              src={contact.heroImagePath}
              width={1080}
            />
          </div>
          <div className="mt-4 rounded-[1.75rem] border border-brand-ink/10 bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">Lưu ý khi đăng ký</p>
            <p className="mt-3 text-base font-semibold text-brand-ink">
              Nên chuẩn bị trước số điện thoại, khu vực lắp và ghi chú về loại nhà hoặc điểm kéo dây.
            </p>
            <p className="mt-2 text-sm leading-6 text-brand-muted">
              Thông tin này giúp đầu mối tư vấn trả lời nhanh hơn về khả năng phục vụ, khoảng giá tham khảo và nhịp xử lý phù hợp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
