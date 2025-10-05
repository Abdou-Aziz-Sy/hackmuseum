import { useState, useEffect } from "react";
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, XCircle, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotificationStore, Notification } from "@/services/notification-service";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

const NotificationCenter = () => {
  const { t } = useLanguage();
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications,
    clearByCategory
  } = useNotificationStore();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'artwork' | 'reservation' | 'maintenance'>('all');
  const [animateIcon, setAnimateIcon] = useState(false);

  // Animer l'icône de notification quand une nouvelle notification arrive
  useEffect(() => {
    if (unreadCount > 0) {
      setAnimateIcon(true);
      const timeout = setTimeout(() => setAnimateIcon(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [unreadCount]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'system': return 'Système';
      case 'user': return 'Utilisateur';
      case 'artwork': return 'Œuvre';
      case 'reservation': return 'Réservation';
      case 'maintenance': return 'Maintenance';
      default: return category;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bell className={cn(
                "h-5 w-5", 
                animateIcon && "animate-bounce text-primary",
                unreadCount > 0 && "text-primary"
              )} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications {unreadCount > 0 ? `(${unreadCount} non lues)` : ''}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-[380px] z-50 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={markAllAsRead}>
                      <Check className="mr-2 h-4 w-4" />
                      Tout marquer comme lu
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearAllNotifications}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Effacer toutes les notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Fermer</span>
                </Button>
              </div>
            </div>
            <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-full">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="unread">Non lus</TabsTrigger>
                <TabsTrigger value="artwork">Œuvres</TabsTrigger>
                <TabsTrigger value="system">Système</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <Bell className="h-8 w-8 mb-2 opacity-20" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "p-3 hover:bg-muted/50 transition-colors",
                        !notification.read && "bg-muted/30"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm leading-none">
                              {notification.title}
                            </p>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="h-3 w-3" />
                                  <span className="sr-only">Marquer comme lu</span>
                                </Button>
                              )}
                              {notification.dismissible !== false && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Supprimer</span>
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-1">
                              <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                                {notification.priority === 'high' ? 'Haute' : 
                                 notification.priority === 'medium' ? 'Moyenne' : 'Basse'}
                              </Badge>
                              <Badge variant="outline">
                                {getCategoryLabel(notification.category)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          {notification.actionUrl && notification.actionLabel && (
                            <div className="mt-2">
                              <Button 
                                variant="link" 
                                className="h-auto p-0 text-xs"
                                asChild
                              >
                                <Link to={notification.actionUrl}>
                                  {notification.actionLabel}
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between py-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => clearByCategory('system')}
            >
              Effacer système
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => clearByCategory('artwork')}
            >
              Effacer œuvres
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Tout marquer comme lu
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all" className="text-xs">Tout</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">Non lues</TabsTrigger>
                  <TabsTrigger value="system" className="text-xs">Système</TabsTrigger>
                  <TabsTrigger value="artwork" className="text-xs">Œuvres</TabsTrigger>
                  <TabsTrigger value="reservation" className="text-xs">Réservations</TabsTrigger>
                </TabsList>
                
                <TabsContent value={filter} className="mt-0">
                  <ScrollArea className="h-96">
                    {filteredNotifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                        <Bell className="h-8 w-8 mb-2" />
                        <p className="text-sm">Aucune notification</p>
                      </div>
                    ) : (
                      <div className="space-y-1 p-2">
                        {filteredNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                              !notification.read ? 'bg-blue-50 border-blue-200' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-medium truncate">
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-1">
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${getPriorityColor(notification.priority)}`}
                                    >
                                      {notification.priority}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {formatTimeAgo(notification.timestamp)}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-6 px-2 text-xs"
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      Marquer comme lu
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    Supprimer
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationCenter;
