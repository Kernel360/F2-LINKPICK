import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type DeleteTagDialogState = {
  isOpen: boolean;
  deleteTagId: number | null;
};

type DeleteTagDialogAction = {
  setIsOpen: (isOpen: boolean) => void;
  setDeleteTagId: (deleteTagId: number | null) => void;
};

const initialState: DeleteTagDialogState = {
  isOpen: false,
  deleteTagId: null,
};

export const useDeleteTagDialogStore = create<
  DeleteTagDialogState & DeleteTagDialogAction
>()(
  immer((set) => ({
    ...initialState,
    setIsOpen: (isOpen) => {
      set((state) => {
        state.isOpen = isOpen;
      });
    },
    setDeleteTagId: (deleteTagId) => {
      set((state) => {
        state.deleteTagId = deleteTagId;
      });
    },
  }))
);
