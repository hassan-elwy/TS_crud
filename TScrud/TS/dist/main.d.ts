declare let modal: HTMLElement | null;
declare function isModalActive(): boolean;
interface formData {
    id: number;
    Title: string;
    pirority: string;
    dueDate: Date;
    Discription: string;
}
declare let infoList: formData[];
declare let count: number;
declare let isUpdate: boolean;
declare let udpateIndex: number;
declare let searchControl: HTMLInputElement;
declare let priority: HTMLInputElement;
declare let dueDate: HTMLInputElement;
declare let descript: HTMLInputElement;
declare let savebtn: HTMLButtonElement;
declare let cancelbtn: HTMLButtonElement;
declare let btnClose: HTMLButtonElement;
declare let Todo: HTMLElement | null;
declare var Progress: HTMLElement | null;
declare var Completed: HTMLElement | null;
declare let emptyState: string;
declare function CreateCard(index: number): string;
declare function updateCard(index: number): void;
declare function deleteInfo(index: number): void;
declare function TodoTranstions(index: number): void;
declare function ToProgressTranstions(index: number): void;
declare function ToCompleteTranstions(index: number): void;
//# sourceMappingURL=main.d.ts.map