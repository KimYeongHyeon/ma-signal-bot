import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Webhook, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const AlertSettings = () => {
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [ma50Period, setMa50Period] = useState(50);
  const [ma200Period, setMa200Period] = useState(200);

  const handleSaveSettings = () => {
    // This will need Supabase integration for actual saving
    console.log("Settings saved:", {
      discordWebhook,
      alertsEnabled,
      ma50Period,
      ma200Period
    });
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          알림 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="alerts-enabled">알림 활성화</Label>
            <p className="text-sm text-muted-foreground">
              이동평균 교차 알림을 받을지 설정합니다
            </p>
          </div>
          <Switch
            id="alerts-enabled"
            checked={alertsEnabled}
            onCheckedChange={setAlertsEnabled}
          />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ma50">단기 이동평균 (MA50)</Label>
              <Input
                id="ma50"
                type="number"
                value={ma50Period}
                onChange={(e) => setMa50Period(parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ma200">장기 이동평균 (MA200)</Label>
              <Input
                id="ma200"
                type="number"
                value={ma200Period}
                onChange={(e) => setMa200Period(parseInt(e.target.value))}
                min="50"
                max="500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discord-webhook" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Discord 웹훅 URL
          </Label>
          <Input
            id="discord-webhook"
            type="url"
            placeholder="https://discord.com/api/webhooks/..."
            value={discordWebhook}
            onChange={(e) => setDiscordWebhook(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Discord 채널의 웹훅 URL을 입력하세요
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30">
          <AlertTriangle className="w-4 h-4 text-accent" />
          <div className="text-sm">
            <div className="font-medium text-accent">백엔드 연동 필요</div>
            <div className="text-muted-foreground">
              실시간 알림 기능을 위해 Supabase 연동이 필요합니다
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSaveSettings}
            className="flex-1"
            disabled={!discordWebhook || !alertsEnabled}
          >
            설정 저장
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
          >
            테스트 알림
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};