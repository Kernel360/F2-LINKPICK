'use client';

import { useRef, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { CreatePickForm } from '@/components/CreatePickForm/CreatePickForm';
import {
  popoverContentStyle,
  urlInputStyle,
  urlSubmitFormStyle,
} from '@/components/CreatePickPopover/CreatePickPopover.css';
import { useTreeStore } from '@/stores';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover/Popover';
import { Text } from '@/ui/Text/Text';

interface OgData {
  url: string;
  imageLink: string;
  title: string;
  description: string;
}

export function CreatePickPopover() {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [isCreated, setIsCreated] = useState<boolean>(false);

  // -------------------------------------------------------
  const [ogData, setOgData] = useState<OgData>({
    url: '',
    imageLink: '',
    title: '',
    description: '',
  });

  // -------------------------------------------------------
  const { getFolderList } = useTreeStore();

  const handleSubmit = () => {
    const urlValue = urlInputRef.current?.value;
    if (!urlValue) return;
    // TODO: (1) check if pick already exists with given url
    //
    // TODO: (2) send url analyze request (og-tag)
    //
    // TODO: (3) set OgData state
    setOgData((prev) => ({
      ...prev,
      url: urlValue,
    }));
    setIsCreated(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <PlusIcon /> New
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={() => {
          setIsCreated(false);
        }}
        sideOffset={20}
        align={'end'}
      >
        <div className={popoverContentStyle}>
          {!isCreated ? (
            <>
              <Text size={'lg'} weight={'light'}>
                새로운 Pick 생성
              </Text>
              <form
                onSubmit={handleSubmit}
                className={urlSubmitFormStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <input
                  placeholder={'웹 주소를 입력하세요'}
                  defaultValue={'https://'}
                  type="text"
                  ref={urlInputRef}
                  className={urlInputStyle}
                />
                <Button onClick={handleSubmit}>Save</Button>
              </form>
            </>
          ) : (
            <CreatePickForm
              title={ogData.title}
              url={ogData.url}
              imageUrl={ogData.imageLink}
              description={ogData.description}
              folderInfoList={getFolderList()}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
