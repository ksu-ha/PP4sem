import { useState } from 'react';
import { AccordionArrowIcon, OpenFullIcon, CommentIcon, ReactionIcon } from '../common/Icons/Icons';
import { truncateCardTitle, truncateCardDescription } from '../../utils/truncate';
import './accordionItem.css';

interface AccordionItemProps {
  type: 'case' | 'team';
  title: string;
  description: string;
  status?: string;
  defaultOpen?: boolean;
  likes?: number;
  dislikes?: number;
  onOpenFull?: () => void;
  onComment?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const AccordionItem = ({
  type,
  title,
  description,
  status = "На оценке",
  defaultOpen = false,
  likes: initialLikes = 2,
  dislikes: initialDislikes = 2,
  onOpenFull,
  onComment,
  onLike: onLikeProp,
  onDislike: onDislikeProp
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const showReactions = type === 'case' && status === 'На оценке';
  
  // Для карточек - стандартная обрезка 55 символов
  const { displayText: displayTitle, fullText: fullTitle } = truncateCardTitle(title);
  
  const displayDescription = isOpen ? description : truncateCardDescription(description);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
    onLikeProp?.();
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
    onDislikeProp?.();
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-card">
        <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="accordion-header-left">
            <div className="accordion-toggle">
              <AccordionArrowIcon />
            </div>
            <span className="accordion-title" title={fullTitle}>
              {displayTitle}
            </span>
          </div>
          {type === 'case' && (
            <div className="accordion-header-center">
              <div className="status-dot"></div>
              <span className="status-text">{status}</span>
            </div>
          )}
          <div className="accordion-open-btn" onClick={(e) => { e.stopPropagation(); onOpenFull?.(); }}>
            Открыть полностью
            <OpenFullIcon />
          </div>
        </button>
        {isOpen && (
          <div className="accordion-body">
            <p className="accordion-description">{displayDescription}</p>
            
            {showReactions && (
              <div className="accordion-footer">
                <button className="comments-btn" onClick={(e) => { e.stopPropagation(); onComment?.(); }}>
                  <CommentIcon />
                  Комментарии
                </button>
                <div className="reactions">
                  <button className={`reaction-btn like ${liked ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); handleLike(); }}>
                    <ReactionIcon />
                    <span className="count">{likes}</span>
                  </button>
                  <button className={`reaction-btn dislike ${disliked ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); handleDislike(); }}>
                    <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
                      <ReactionIcon />
                    </span>
                    <span className="count">{dislikes}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionItem;