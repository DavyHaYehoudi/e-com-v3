import DraftBadge from '@/components/shared/badge/DraftBadge';
import PendingBadge from '@/components/shared/badge/PendingBadge';
import ValidBadge from '@/components/shared/badge/ValidBadge';
import React from 'react';

interface CardStatusBadgeProps{
    status: "draft"|"prepared"|"sent";
}
const CardStatusBadge: React.FC<CardStatusBadgeProps> = ({ status }) => {
    console.log('status:', status)
    const renderBadge = () => {
        switch (status) {
            case "sent":
                return <ValidBadge label="envoyé" />;
            case "draft":
                return <DraftBadge label="brouillon" />;
            case "prepared":
            default:
                return <PendingBadge label="en attente" />;
        }
    };

    return <div className="my-2">{renderBadge()}</div>;
};


export default CardStatusBadge;