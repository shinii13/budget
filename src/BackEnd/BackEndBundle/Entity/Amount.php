<?php

namespace BackEnd\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity
 * @ORM\Table(name="Amount")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Amount
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
    protected $userName;
    /**
     * @ORM\Column(type="string")
     */
    protected $sum;
    /**
     * @ORM\Column(type="string")
     */
    protected $categorId;
    /**
     * @ORM\Column(type="string")
     */
    protected $subcategorId;
    /**
     * @ORM\Column(type="text")
     */
    protected $comments;
    /**
     * @ORM\Column(type="string")
     */
    protected $date;
    /**
     * @ORM\Column(type="datetime")
     */
    protected $created;
    /**
     * @ORM\Column(type="datetime")
     */
    protected $updated;

    public function __construct()
    {
        $this->setCreated(new \DateTime());
        $this->setUpdated(new \DateTime());
    }

    /**
     * @ORM\PreUpdate
     */
    public function setUpdatedValue()
    {
        $this->setUpdated(new \DateTime());
    }



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
     * Set userName
     *
     * @param string $userName
     * @return Amount
     */
    public function setUserName($userName)
    {
        $this->userName = $userName;

        return $this;
    }

    /**
     * Get userName
     *
     * @return string 
     */
    public function getUserName()
    {
        return $this->userName;
    }

    /**
     * Set sum
     *
     * @param string $sum
     * @return Amount
     */
    public function setSum($sum)
    {
        $this->sum = $sum;

        return $this;
    }

    /**
     * Get sum
     *
     * @return string 
     */
    public function getSum()
    {
        return $this->sum;
    }

    /**
     * Set categorId
     *
     * @param string $categorId
     * @return Amount
     */
    public function setCategorId($categorId)
    {
        $this->categorId = $categorId;

        return $this;
    }

    /**
     * Get categorId
     *
     * @return string 
     */
    public function getCategorId()
    {
        return $this->categorId;
    }

    /**
     * Set subcategorId
     *
     * @param string $subcategorId
     * @return Amount
     */
    public function setSubcategorId($subcategorId)
    {
        $this->subcategorId = $subcategorId;

        return $this;
    }

    /**
     * Get subcategorId
     *
     * @return string 
     */
    public function getSubcategorId()
    {
        return $this->subcategorId;
    }

    /**
     * Set comments
     *
     * @param string $comments
     * @return Amount
     */
    public function setComments($comments)
    {
        $this->comments = $comments;

        return $this;
    }

    /**
     * Get comments
     *
     * @return string 
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * Set date
     *
     * @param string $date
     * @return Amount
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return string 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Amount
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime 
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     * @return Amount
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime 
     */
    public function getUpdated()
    {
        return $this->updated;
    }
}
