import React from "react";
import * as R from "../styles/components/ReviewCardStyle";

import star from "../assets/images/star.svg";
import thumbsup from "../assets/images/thumbsup.svg";

function ReviewCard() {
    return (
        <R.ReviewCard>
            <R.Container>
                <R.Content>
                    할인 이벤트를 자주 하는 것 같아요!! 요즘 할인하는 거 없나
                    맨날 들락날락거리네요ㅎㅎ 살거 없어도 구경하는거
                    잼나네용~!^^ 할인 이벤트를 자주 하는 것 같아요!! 요즘
                    할인하는 거 없나 맨날 들락날락거리네요ㅎㅎ 살거 없어도
                    구경하는거 잼나네용~!^^
                </R.Content>
                <R.Info>
                    <R.Score>
                        <R.InfoImg src={star} />
                        <R.InfoText>4.5</R.InfoText>
                        <R.InfoImg
                            src={thumbsup}
                            style={{ marginLeft: "10px" }}
                        />
                        <R.InfoText>10</R.InfoText>
                    </R.Score>
                    <R.InfoText>2025-01-01</R.InfoText>
                </R.Info>
            </R.Container>
            <R.Container>
                <R.Content>
                    할인 이벤트를 자주 하는 것 같아요!! 요즘 할인하는 거 없나
                    맨날 들락날락거리네요ㅎㅎ 살거 없어도 구경하는거
                    잼나네용~!^^ 할인 이벤트를 자주 하는 것 같아요!! 요즘
                    할인하는 거 없나 맨날 들락날락거리네요ㅎㅎ 살거 없어도
                    구경하는거 잼나네용~!^^
                </R.Content>
                <R.Info>
                    <R.Score>
                        <R.InfoImg src={star} />
                        <R.InfoText>4.5</R.InfoText>
                        <R.InfoImg
                            src={thumbsup}
                            style={{ marginLeft: "10px" }}
                        />
                        <R.InfoText>10</R.InfoText>
                    </R.Score>
                    <R.InfoText>2025-01-01</R.InfoText>
                </R.Info>
            </R.Container>
            <R.Container>
                <R.Content>
                    할인 이벤트를 자주 하는 것 같아요!! 요즘 할인하는 거 없나
                    맨날 들락날락거리네요ㅎㅎ 살거 없어도 구경하는거
                    잼나네용~!^^ 할인 이벤트를 자주 하는 것 같아요!! 요즘
                    할인하는 거 없나 맨날 들락날락거리네요ㅎㅎ 살거 없어도
                    구경하는거 잼나네용~!^^
                </R.Content>
                <R.Info>
                    <R.Score>
                        <R.InfoImg src={star} />
                        <R.InfoText>4.5</R.InfoText>
                        <R.InfoImg
                            src={thumbsup}
                            style={{ marginLeft: "10px" }}
                        />
                        <R.InfoText>10</R.InfoText>
                    </R.Score>
                    <R.InfoText>2025-01-01</R.InfoText>
                </R.Info>
            </R.Container>
        </R.ReviewCard>
    );
}

export default ReviewCard;
