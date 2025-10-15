import Modal from "@/components/ui/Modal";
import Link from "next/link";
import Button from "@/components/ui/Button";

const InquirySuccessModal = ({ handleClose }: { handleClose: () => void }   ) => {
    return (
        <Modal handleClose={handleClose}>
            <div className="bg-white p-4">
                <h1 className="text-center text-2xl font-bold mb-3">문의가 접수되었습니다.</h1>
                <p className="text-center text-md mb-5">문의 내용을 확인 후 빠른 시일 내에 답변드리겠습니다.</p>
                <div className="flex gap-4 w-full">
                    <Link className="w-full" href="/">
                        <Button className="w-full">홈으로</Button>
                    </Link>
                    <Button type="button" className="w-full bg-gray-500" onClick={handleClose}>
                        닫기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default InquirySuccessModal;