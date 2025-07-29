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
  const [ma25Period, setMa25Period] = useState(25);
  const [ma50Period, setMa50Period] = useState(50);
  const [ma100Period, setMa100Period] = useState(100);
  const [maxWaitTime, setMaxWaitTime] = useState(24); // hours
  const [profitMultiplier, setProfitMultiplier] = useState(1.5);

  const handleSaveSettings = () => {
    // This will need Supabase integration for actual saving
    console.log("Settings saved:", {
      discordWebhook,
      alertsEnabled,
      ma25Period,
      ma50Period,
      ma100Period,
      maxWaitTime,
      profitMultiplier
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
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ma25">단기 이동평균 (MA25)</Label>
              <Input
                id="ma25"
                type="number"
                value={ma25Period}
                onChange={(e) => setMa25Period(parseInt(e.target.value))}
                min="1"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ma50">중기 이동평균 (MA50)</Label>
              <Input
                id="ma50"
                type="number"
                value={ma50Period}
                onChange={(e) => setMa50Period(parseInt(e.target.value))}
                min="25"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ma100">장기 이동평균 (MA100)</Label>
              <Input
                id="ma100"
                type="number"
                value={ma100Period}
                onChange={(e) => setMa100Period(parseInt(e.target.value))}
                min="50"
                max="200"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxWaitTime">최대 대기시간 (시간)</Label>
              <Input
                id="maxWaitTime"
                type="number"
                value={maxWaitTime}
                onChange={(e) => setMaxWaitTime(parseInt(e.target.value))}
                min="1"
                max="168"
              />
              <p className="text-xs text-muted-foreground">
                하방돌파 후 상방돌파까지 최대 대기시간
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profitMultiplier">수익 배수</Label>
              <Input
                id="profitMultiplier"
                type="number"
                step="0.1"
                value={profitMultiplier}
                onChange={(e) => setProfitMultiplier(parseFloat(e.target.value))}
                min="1"
                max="5"
              />
              <p className="text-xs text-muted-foreground">
                수익목표 = 매수가 + (매수가-MA50) × 배수
              </p>
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

        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <AlertTriangle className="w-4 h-4 text-blue-500" />
            <div className="text-sm">
              <div className="font-medium text-blue-500">매매 전략 설정</div>
              <div className="text-muted-foreground">
                • 정방향 정렬: 현재가 &gt; MA25 &gt; MA50 &gt; MA100<br/>
                • MA25 하방돌파 후 상방돌파시 매수 신호<br/>
                • 수익목표: 매수가 + (매수가-MA50) × 배수<br/>
                • 손절가: MA50, 수수료: 0.05%
              </div>
            </div>
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