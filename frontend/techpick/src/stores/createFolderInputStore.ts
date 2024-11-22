import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type CreateFolderInputState = {
  newFolderParentId: number | null;
};

type CreateFolderInputAction = {
  setNewFolderParentId: (newFolderParentId: number | null) => void;
  closeCreateFolderInput: () => void;
};

const initialState: CreateFolderInputState = {
  newFolderParentId: null,
};

export const useCreateFolderInputStore = create<
  CreateFolderInputState & CreateFolderInputAction
>()(
  immer((set) => ({
    ...initialState,
    setNewFolderParentId: (newFolderParentId) => {
      set((state) => {
        state.newFolderParentId = newFolderParentId;
      });
    },
    closeCreateFolderInput: () => {
      set((state) => {
        state.newFolderParentId = null;
      });
    },
  }))
);
