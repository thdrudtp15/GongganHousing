'use client';
import { sendInquiry } from '@/actions/sendInquiry';
import { useActionState, useState, useRef, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {Input, Textarea, Checkbox, File} from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import InquirySuccessModal from './InquirySuccessModal';

import { services } from '@/constants/services';

import type { TurnstileInstance } from '@marsidev/react-turnstile';
import type { ChangeEvent } from 'react';

const InquiryForm = () => {
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [isSuccess, setIsSuccess] = useState(false);


  const [state, action, pending] = useActionState(sendInquiry, {
    name: '',
    phone: '',
    inquiry: '',
    agree: '',
    server: '',
    file : '',
    success : false
  });

  const handleSubmit = async (formData: FormData) => {
    if (!turnstileRef.current) return;
    action(formData);
    // 턴스타일 초기화
    turnstileRef.current.reset();
  };

  const addFile = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { files }  = e.target as HTMLInputElement
    if (files) {
      setFiles((prev : File[]) => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f.name !== file.name));
  };

  // 서버 에러 발생 시 alert
  useEffect(() => {
    if(!state.server) return;
    alert(state.server)
  },[state.server])


  // 문의 사항 접수 성공 시 모달
  useEffect(() => {
    if(!state.success) return;
    setIsSuccess(true);
  },[state.success])


  return (
    <>
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
              name="inquiry"
              placeholder="문의 내용을 작성해주세요"
              inputClassName="resize-y h-40"
            />
            <File
              title="첨부파일"
              name="files"
              files={files}
              addFile={addFile}
              removeFile={removeFile}
              error={state.file}
            />
          </div>
          <Checkbox title="개인정보취급방침동의" name="agree" error={state.agree} />
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
            onSuccess={(token) => setToken(token)}
            ref={turnstileRef}
          />
          <Button
            disabled={pending || !token}
            type="submit"
          >
            {pending && <AiOutlineLoading3Quarters className="animate-spin" />}
            {!pending && !token && '자동 인증을 완료해주세요'}
            {token && !pending && '상담 요청하기'}
          </Button>
          <input type="hidden" value={token || ''} name="turnstile_token" />
        </form>
      </div>
      {isSuccess && <InquirySuccessModal handleClose={() => setIsSuccess(false)} />}
    </>
  );
};

export default InquiryForm;
