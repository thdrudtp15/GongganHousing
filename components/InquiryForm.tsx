'use client';

import { sendInpuiry } from '@/actions/sendInquiry';
import { useActionState } from 'react';

import '../app/globals.css';

type InputProps = {
  title: string;
  error: string;
  type: 'textarea' | 'input';
  name: string;
  placeholder: string;
  className?: string;
};

const Checkbox = ({
  text,
  name,
  error,
}: {
  text: string;
  name: string;
  error: string;
}) => {
  return (
    <label className="w-[fit-content] text-[#222222]">
      <input
        className="mr-[8px] "
        // defaultChecked={false}
        type="checkbox"
        name={name}
      />
      {text} {error}
    </label>
  );
};

const Input = ({
  title,
  error,
  type,
  name,
  placeholder,
  className,
}: InputProps) => {
  const inputClassName = `
        p-[12px] w-full outline-none
        border-b-[2px] border-b-[#cccccc]
        focus:border-b-[#0c1d30]
        transition
    `;
  return (
    <label>
      {title && (
        <h4 className="text-[14px] font-regular mb-[4px] text-[#222222]">
          {title} {error}
        </h4>
      )}
      {type === 'input' && (
        <input
          className={`${inputClassName} ${className} text-[#222222]`}
          type="text"
          name={name}
          placeholder={placeholder}
        />
      )}
      {type === 'textarea' && (
        <textarea
          className={`${inputClassName} ${className} text-[#222222]`}
          name={name}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};

const InquiryForm = () => {
  // const [token, setToken] = useState<string | null>(null);
  // const [widgetId, setWidgetId] = useState<number | null>(null);

  const [state, action, pending] = useActionState(
    sendInpuiry,
    {
      name: '',
      phone: '',
      inquiry: '',
      agree: '',
      server: '',
    },
  );

  // 턴스타일 + IP 기반 서버 제한

  return (
    <div className="flex-1">
      <div id="widget-container"></div>
      <h3 className="text-6xl text-[#0b1b30] font-bold mb-[8px]">
        상담문의
      </h3>
      <p className="text-[20px] font-medium mb-[60px] text-[#222222]">
        “편하게 문의 주시면, 최적의 솔루션을
        찾아드립니다.”
      </p>
      <form
        className="flex flex-col gap-[20px]"
        action={action}
      >
        <div className="flex flex-col gap-[40px]">
          <Input
            title="이름"
            error={state.name}
            type="input"
            name="name"
            placeholder="이름을 입력해주세요"
          />
          <Input
            title="연락처"
            error={state.phone}
            type="input"
            name="phone"
            placeholder="연락처를 작성해주세요"
          />
          <Input
            title="문의내용"
            error={state.inquiry}
            type="textarea"
            name="inquiry"
            placeholder="문의 내용을 작성해주세요"
            className="resize-none h-[96px]"
          />
        </div>
        <Checkbox
          text="개인정보취급방침동의"
          name="agree"
          error={state.agree}
        />
        <button
          disabled={pending}
          className="py-[20px] px-[30px] w-full cursor-pointer bg-[#0c1d30] font-medium text-[20px] text-[#F5F6F5]"
        >
          상담 신청하기
        </button>
        {state.server}
      </form>
    </div>
  );
};

export default InquiryForm;
