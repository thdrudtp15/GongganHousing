'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import { Input, Textarea } from '@/compositions/Input';
import Select from '@/compositions/Select';

import { services } from '@/constants/services';

import { createPortfolio } from '@/actions/portfolio';
import { useRouter } from 'next/navigation';

import type { ChangeEvent } from 'react';
import type { Portfolio } from '@/types/portfolio';


import { MdOutlineImage } from "react-icons/md";

type ExistingImage = {
  id: number;
  image: string;
};

type ImageItem = ExistingImage | File;

const Preview = ({
  file,
  removeImage,
  isMain
}: {
  file: ImageItem;
  removeImage: (file: ImageItem) => void;
  isMain: boolean;
}) => {
  // const preview = URL.createObjectURL(file);

  let preview;
  if (file instanceof File) {
    preview = URL.createObjectURL(file);
  } else {
    preview = file.image;
  }
  return (
    <div
      className="relative h-70 group"
      onClick={() => {
        URL.revokeObjectURL(preview);
        removeImage(file);
      }}
    > 
      {isMain && <div className="absolute top-4 left-4 z-[2] bg-black rounded p-1">
        <p className="text-white font-bold text-sm">대표 이미지</p>
      </div>}
      <div className="absolute opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 top-0 w-full h-full left-0 z-[2] 
                      bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
      <p className="text-white font-bold text-2xl">클릭하여 삭제</p>
      </div>
      <Image fill src={preview} alt="upload image" className="object-cover" />
    </div>
  );
};

const PreviewImage = React.memo(Preview);

const PortfolioForm = ({ data, imageData }: { data?: Portfolio; imageData: ExistingImage[] }) => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [images, setImages] = useState<ImageItem[] | null | undefined>(imageData);
  const [deleteImage, setDeleteImage] = useState<ExistingImage[] | null>([]);

  const [state, formAction, pending] = useActionState(createPortfolio, {
    description: '',
    title: '',
    completed_at: '',
    category: '',
    image: '',
    server: '',
    id: '',
    started_at: '',
  });

  //========================
  // 서버액션!
  //========================
  const handleSubmit = (formData: FormData) => {
    //삭제할 이미지 파일 append
    if (deleteImage && deleteImage.length > 0) {
      deleteImage?.forEach((image: ExistingImage, index: number) => {
        formData.append(`delete_${index}`, JSON.stringify(image));
      });
      formData.append('delete_count', deleteImage.length.toString());
    }

    // 추가할 이미지 파일 append
    if (images && images.length > 0) {
      let imageCount = 0;
      images.forEach((image) => {
        if (image instanceof File) {
          formData.append(`image_${imageCount}`, image);
          imageCount++;
        }
      });
      formData.append('image_count', imageCount.toString());
    }

    if (data?.id) {
      formData.append('id', data.id.toString());
    }

    formAction(formData);
  };

  //========================
  // 이미지 추가
  //========================
  const addImage = async (e: ChangeEvent<HTMLInputElement>) => {
   try {
    if (!e.target.files) return;
    const { files } = e.target;

    const processedFiles : File[] = [];
    const failedFiles : string[]  = [];
    const skippedFiles : string[] = [];

    const MAX_IMAGE_COUNT = 10;
    const MAX_FILE_SIZE = 0.8 * 1024 * 1024; 
    const MAX_TOTAL_SIZE = 8 * 1024 * 1024; // 8MB

    const currentCount = (images || []).length;
 

    const availableSlots = MAX_IMAGE_COUNT - currentCount;
    const filesToProcess = Array.from(files).slice(0, availableSlots);

    if ((currentCount >= MAX_IMAGE_COUNT) || (files.length > availableSlots)) {
      alert(`이미지는 최대 ${MAX_IMAGE_COUNT}개까지 업로드할 수 있습니다.`);
      return;
    }

     // ✅ 순차 처리 (메모리 효율적)
     for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      
      // 중복 체크 (같은 이름, 같은 크기)
      const isDuplicate = processedFiles.some(
        (f) => f.name === file.name && f.size === file.size
      );
      
      if (isDuplicate) {
        skippedFiles.push(file.name);
        continue;
      }

      try {
        let targetFile: File;

        if (file.size > MAX_FILE_SIZE || file.type !== 'image/jpeg') {
          
          const compressed = await imageCompression(file, {
            maxSizeMB: 0.7, 
            maxWidthOrHeight: 1200,
            useWebWorker: true,
            initialQuality: 1,
            fileType: 'image/jpeg',
          });

          targetFile = new File(
            [compressed],
            file.name.replace(/\.\w+$/, '.jpg'), 
            {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }
          );
        } else {
          // 이미 충분히 작으면 그대로 사용
          targetFile = file;
        }

        // 압축 후에도 너무 크면 스킵
        if (targetFile.size > 1 * 1024 * 1024) {
          skippedFiles.push(file.name);
          continue;
        }

        processedFiles.push(targetFile);

      } catch (error) {
        console.error(`❌ 압축 실패:`, error);
        failedFiles.push(file.name);
      }
    }

     // 결과 검증
     const totalSize = processedFiles.reduce((sum, f) => sum + f.size, 0);
     const existingSize = (images || [])
       .filter((img): img is File => img instanceof File)
       .reduce((sum, f) => sum + f.size, 0);
     const newTotalSize = existingSize + totalSize;
 
     console.log(`\n=== 처리 결과 ===`);
     console.log(`성공: ${processedFiles.length}개 (${(totalSize / 1024 / 1024).toFixed(2)}MB)`);
     console.log(`실패: ${failedFiles.length}개`);
     console.log(`중복: ${skippedFiles.length}개`);
     console.log(`기존: ${(existingSize / 1024 / 1024).toFixed(2)}MB`);
     console.log(`합계: ${(newTotalSize / 1024 / 1024).toFixed(2)}MB`);
 
     // 전체 크기 체크
     if (newTotalSize > MAX_TOTAL_SIZE) {
       alert(
         `전체 이미지 크기가 ${(MAX_TOTAL_SIZE / 1024 / 1024).toFixed(0)}MB를 초과합니다.\n` +
         `현재: ${(newTotalSize / 1024 / 1024).toFixed(2)}MB\n` +
         `기존 이미지를 일부 삭제하거나 새 이미지 수를 줄여주세요.`
       );
       return;
     }
 
     // 실패/스킵 알림
     if (failedFiles.length > 0) {
       alert(`다음 파일 처리 실패:\n${failedFiles.join('\n')}`);
     }
     if (skippedFiles.length > 0) {
       alert(`다음 파일 제외됨:\n${skippedFiles.join('\n')}\n(중복 또는 크기 초과)`);
     }
 
     if (processedFiles.length === 0) {
       alert('추가할 수 있는 이미지가 없습니다.');
       return;
     }
 
     // ✅ 상태 업데이트
     setImages((prev) => [...(prev ?? []), ...processedFiles]);
 
     if (imageRef.current) {
       imageRef.current.value = '';
     }
 
     console.log('✓ 이미지 추가 완료\n');
    }
   catch(e) {
    alert(e);
   }
  };

  //========================
  // 이미지 삭제
  //========================
  const removeImage = (file: ImageItem) => {
    if (!images || images.length === 0) return;

    // 오브젝트 (현재 DB에 저장된 이미지의 경우)
    if ('id' in file) {
      // 삭제 배열에 추가
      setDeleteImage((prev) => [...(prev ?? []), file]);
    }
    // 파일의 경우
    const filtered = images.filter((item) => {
      if (item instanceof File && file instanceof File) {
        return !(item.name === file.name && item.lastModified === file.lastModified);
      } else if ('id' in item && 'id' in file) {
        return item.id !== file.id;
      }
      return true;
    });

    setImages(filtered);
  };
  //========================
  // 게시글 작성 및 수정 시 로직
  //========================
  useEffect(() => {
    if (!state.id) return;
    router.push(`/portfolio/${state.id}`);
  }, [state.id, router]);

  return (
    <div>
    <form ref={formRef} className="flex flex-col gap-10" action={handleSubmit}>
      <Input 
        title="제목" 
        type='text'
        placeholder='제목'
        name='title'
        defaultValue={data?.title}
        error={state.title}
      />
      
      <div className='w-full flex items-center gap-4'>
        <Input 
          title="시공 시작 날짜" 
          type='date'
          className='flex-1'
          placeholder='시공 시작 날짜'
          name='started_at'
          defaultValue={data?.started_at}
          error={state.started_at}
        />
        <Input 
          title="시공 종료 날짜" 
          type='date'
          className='flex-1'
          placeholder='시공 종료 날짜'
          name='completed_at'
          defaultValue={data?.completed_at}
          error={state.completed_at}
        />
      </div>
      
      <Select
        title="시공 분야"
        options={services}
        name="category"
        error={state.category}
      />
      
      <Textarea
        title="설명"
        name="description"
        placeholder="설명"
        defaultValue={data?.description}
        error={state.description}
      />
  
      {/* 🎯 이미지 섹션 */}
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">시공 이미지</h3>
            <p className="text-sm text-gray-500">
              첫 번째 이미지가 대표 이미지로 표시됩니다
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => imageRef.current?.click()}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            이미지 추가
          </button>
        </div>
  
        {/* 이미지 그리드 */}
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <PreviewImage 
                key={index}
                file={image} 
                removeImage={removeImage}
                isMain={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <MdOutlineImage className="w-12 h-12 text-gray-300 m-auto" />
            <p className="mt-2 text-sm text-gray-600">
              이미지를 추가해주세요
            </p>
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              파일 선택
            </button>
          </div>
        )}
  
        {state.image && (
          <p className="text-red-500 text-sm">{state.image}</p>
        )}
      </div>
  
      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 text-white px-6 py-3 disabled:opacity-50 hover:bg-blue-600 transition-colors font-medium"
      >
        {pending ? '등록 중...' : `시공사례 ${data?.id ? '수정' : '등록'}`}
      </button>
  
      {state.server && (
        <p className={`text-sm ${state.server === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {state.server}
        </p>
      )}
  
      {/* Hidden inputs */}
      <input
        onChange={(e) => addImage(e)}
        ref={imageRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
      />
      {data?.id && <input name="id" value={data.id} type="hidden" />}
    </form>
  </div>
  );
};

export default PortfolioForm;
