'use client';
import { sendInpuiry } from '@/actions/sendInquiry';
import { useActionState, useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {Input, Textarea, Checkbox} from '@/compositions/Input';
import Select from '@/compositions/Select';

import { services } from '@/constants/services';

import type { TurnstileInstance } from '@marsidev/react-turnstile';

const InquiryForm = () => {
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [state, action, pending] = useActionState(sendInpuiry, {
    name: '',
    phone: '',
    inquiry: '',
    agree: '',
    server: '',
  });

  const handleSubmit = async (formData: FormData) => {
    if (!turnstileRef.current) return;
    action(formData);
    // 턴스타일 초기화
    turnstileRef.current.reset();
  };

  return (
    <div className="flex-1">
      <div id="widget-container"></div>
      <form className="flex flex-col gap-5" action={handleSubmit}>
        <div className="flex flex-col gap-8 mb-4">
          <Input
            title="이름"
            required
            error={state.name}
            type="input"
            name="name"
            placeholder="이름을 입력해주세요"
          />
          <Input
            title="연락처"
            required
            error={state.phone}
            type="input"
            name="phone"
            placeholder="연락처를 작성해주세요"
          />
          <Select
            title="문의 분야"
            name="inquiry_category"
            options={services}
          />
          <Textarea
            title="문의내용"
            required
            error={state.inquiry}
            type="textarea"
            name="inquiry"
            placeholder="문의 내용을 작성해주세요"
            className="resize-none h-[96px]"
          />
            <Input
            title="첨부파일"
            error={state.phone}
            type="file"
            name="phone"
            placeholder="연락처를 작성해주세요"
          />
        </div>
        <Checkbox title="개인정보취급방침동의" name="agree" error={state.agree} />
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
          onSuccess={(token) => setToken(token)}
          ref={turnstileRef}
        />
        <button
          disabled={pending || !token}
          className="bg-(--identity) text-white px-4 py-5 text-lg disabled:opacity-70 transition-colors font-medium cursor-pointer"
        >
          {(pending || !token) && <AiOutlineLoading3Quarters fontSize={20} className="animate-spin m-auto" />}
          {token && !pending && '상담 요청하기'}
        </button>
        {state.server}
        <input type="hidden" value={token || ''} name="turnstile_token" />
      </form>
    </div>
  );
};

export default InquiryForm;
