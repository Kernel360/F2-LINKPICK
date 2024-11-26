import { MessageCircleWarningIcon } from 'lucide-react';
import { qnaSection } from './qnAFloatingLink.css';

export function QnAFloatingLink() {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfAWEFi1P1EEnhC8DzOWktqzef2vWifrA80sZBiwel6YVV6OA/viewform"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div data-qna className={qnaSection}>
        <MessageCircleWarningIcon size={64} />
      </div>
    </a>
  );
}
