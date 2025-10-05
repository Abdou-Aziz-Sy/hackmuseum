import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Share2, 
  Flag,
  MoreVertical,
  ThumbsUp,
  Reply
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

interface DiscussionProps {
  artworkId: string;
  artworkTitle: string;
}

const Discussion = ({ artworkId, artworkTitle }: DiscussionProps) => {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Simulation de commentaires existants
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: "1",
        userId: "user1",
        userName: "Marie Diop",
        content: "Cette œuvre est absolument magnifique ! Les détails sont incroyables.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 heures ago
        likes: 12,
        replies: [
          {
            id: "1-1",
            userId: "user2",
            userName: "Ahmadou Ba",
            content: "Je suis d'accord, c'est un chef-d'œuvre !",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            likes: 3,
            replies: []
          }
        ]
      },
      {
        id: "2",
        userId: "user3",
        userName: "Fatou Sall",
        content: "J'aimerais en savoir plus sur l'histoire de cette sculpture. Quelqu'un a-t-il des informations ?",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 8,
        replies: []
      }
    ];
    setComments(mockComments);
  }, [artworkId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setIsLoading(true);
    
    // Simuler l'envoi du commentaire
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const comment: Comment = {
      id: Date.now().toString(),
      userId: user?.id || "",
      userName: user?.name || "Utilisateur",
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
    setIsLoading(false);
  };

  const handleLike = (commentId: string) => {
    if (!isAuthenticated) return;
    
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    return `Il y a ${Math.floor(diffInMinutes / 1440)}j`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Discussions sur "{artworkTitle}"
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{comments.length} commentaires</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Masquer" : "Voir les discussions"}
          </Button>
        </div>
      </CardHeader>
      
      {showComments && (
        <CardContent className="space-y-4">
          {/* Formulaire de commentaire */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <Textarea
                placeholder="Partagez vos impressions sur cette œuvre..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Connecté en tant que {user?.name}
                </div>
                <Button type="submit" disabled={isLoading || !newComment.trim()}>
                  {isLoading ? "Envoi..." : "Publier"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Connectez-vous pour participer aux discussions
              </p>
              <Button size="sm">
                Se connecter
              </Button>
            </div>
          )}

          {/* Liste des commentaires */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.userAvatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(comment.userName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm">{comment.content}</p>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(comment.id)}
                        className={`text-xs ${comment.isLiked ? 'text-red-500' : ''}`}
                      >
                        <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                        {comment.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Reply className="h-3 w-3 mr-1" />
                        Répondre
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Partager
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Réponses */}
                {comment.replies.length > 0 && (
                  <div className="ml-11 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.userAvatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(reply.userName)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs">{reply.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(reply.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-xs">{reply.content}</p>
                          
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-6 px-2"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                            
                            <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                              <Reply className="h-3 w-3 mr-1" />
                              Répondre
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucun commentaire pour le moment</p>
              <p className="text-sm">Soyez le premier à partager vos impressions !</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default Discussion;
