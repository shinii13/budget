<?php

namespace BackEnd\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity
 * @ORM\Table(name="Categor")
 * @ORM\HasLifecycleCallbacks
 */
class Categor
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @ORM\Column(type="string")
     */
    protected $categorName;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set categorName
     *
     * @param string $categorName
     * @return Categor
     */
    public function setCategorName($categorName)
    {
        $this->categorName = $categorName;

        return $this;
    }

    /**
     * Get categorName
     *
     * @return string 
     */
    public function getCategorName()
    {
        return $this->categorName;
    }
}
